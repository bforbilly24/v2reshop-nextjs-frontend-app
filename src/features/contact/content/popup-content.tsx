import { OfficeData } from '@/constant'

// const GROW_UP_ICON = `<svg class="size-4 text-teal-500 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`

// const GROW_DOWN_ICON = `<svg class="size-4 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`
{
  /* <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500">Active Users:</span>
          <div class="flex items-center space-x-1">
            <span class="text-sm font-medium ${office.current.isGrown ? 'text-teal-600' : 'text-red-600'}">${office.current.value}</span>
            ${office.current.isGrown ? GROW_UP_ICON : GROW_DOWN_ICON}
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500">New Signups:</span>
          <div class="flex items-center space-x-1">
            <span class="text-sm font-medium ${office.previous.isGrown ? 'text-teal-600' : 'text-red-600'}">${office.previous.value}</span>
            ${office.previous.isGrown ? GROW_UP_ICON : GROW_DOWN_ICON}
          </div>
        </div>
        
        <div class="pt-2 mt-3 border-t border-gray-100">
          <span class="text-xs text-gray-400">Growth Rate: ${office.current.percent}%</span>
        </div> */
}
const createPopupContent = (office: OfficeData): string => {
  return `
    <div class="bg-white rounded-xl shadow-xl w-48 p-4 flex items-center justify-center">
        <div>
          <div class="size-5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
        </div>
        <div>
          <h3 class="text-sm font-semibold text-primary">${office.city}, ${office.country}</h3>
          <p class="text-xs text-muted-foreground">Re-Shop Office</p>
        </div>
    </div>
  `
}

export { createPopupContent }
