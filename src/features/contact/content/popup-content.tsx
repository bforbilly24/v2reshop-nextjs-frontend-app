import { OfficeData } from '@/constant'

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
