import { onScopeDispose, watch } from 'vue'
import { loadTrafficCycleUsage, resolveTrafficCycleWindow } from '@/services/trafficCycle.service'
import { useAppStore } from '@/stores/app'
import { useNodesStore } from '@/stores/nodes'

const REFRESH_INTERVAL_MS = 5 * 60 * 1000

export function useTrafficCycle(): void {
  const appStore = useAppStore()
  const nodesStore = useNodesStore()
  let refreshTimer: ReturnType<typeof setTimeout> | null = null
  let requestVersion = 0

  const clearTimer = () => {
    if (refreshTimer !== null) {
      clearTimeout(refreshTimer)
      refreshTimer = null
    }
  }

  async function refresh() {
    const version = ++requestVersion
    if (!appStore.trafficCycleEnabled) {
      nodesStore.clearTrafficCycleUsage()
      clearTimer()
      return
    }

    const entityIds = nodesStore.nodes.map(node => node.uuid)
    if (!entityIds.length) {
      clearTimer()
      refreshTimer = setTimeout(() => void refresh(), 5000)
      return
    }

    const window = resolveTrafficCycleWindow(new Date(), appStore.trafficResetDay, appStore.trafficResetTime, appStore.trafficResetTimezone)
    try {
      const usage = await loadTrafficCycleUsage(entityIds, window)
      if (version !== requestVersion)
        return
      nodesStore.applyTrafficCycleUsage(usage, window.start, window.nextReset)
    }
    catch (error) {
      console.warn('[TrafficCycle] Failed to refresh cycle traffic; cumulative counters remain available.', error)
    }
    finally {
      if (version === requestVersion)
        scheduleRefresh(window.nextReset)
    }
  }

  function scheduleRefresh(nextReset: string) {
    clearTimer()
    const untilReset = Math.max(1000, Date.parse(nextReset) - Date.now() + 1000)
    refreshTimer = setTimeout(() => void refresh(), Math.min(REFRESH_INTERVAL_MS, untilReset))
  }

  watch(
    () => [
      appStore.trafficCycleEnabled,
      appStore.trafficResetDay,
      appStore.trafficResetTime,
      appStore.trafficResetTimezone,
      nodesStore.nodes.map(node => node.uuid).join(','),
    ],
    () => void refresh(),
    { immediate: true },
  )

  onScopeDispose(() => {
    requestVersion++
    clearTimer()
  })
}
