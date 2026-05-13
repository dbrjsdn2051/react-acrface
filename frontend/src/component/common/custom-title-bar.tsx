import { Minus, Square, X } from 'lucide-react'
import { useThemeStore } from '../../stores/theme-store.ts'

/**
 * Electron custom titlebar — HD360 디자인 정합 (height 40px, drag region,
 * 좌측 mac traffic-light spacer, 중앙 컨텐츠, 우측 minimize/max/close).
 *
 * BrowserWindow 옵션: frame: false + titleBarStyle: 'hidden' + trafficLightPosition
 * 으로 native 버튼은 가리고 직접 그림.
 *
 * 다크/라이트 테마 따라 색 토글 (useThemeStore).
 */
const CustomTitleBar = () => {
    const { isDark } = useThemeStore()

    const isMac = typeof window !== 'undefined' && /Macintosh/.test(window.navigator.userAgent)

    const handleMinimize = () => window.electronAPI?.minimize()
    const handleMaximize = () => window.electronAPI?.maximize()
    const handleClose = () => window.electronAPI?.close()

    const baseBg = isDark
        ? 'bg-[#0e1426] text-slate-100 border-white/10'
        : 'bg-white text-zinc-900 border-zinc-200'

    const btnHover = isDark
        ? 'hover:bg-white/10 text-slate-200'
        : 'hover:bg-zinc-200/70 text-zinc-700'

    return (
        <div
            className={`fixed inset-x-0 top-0 z-50 flex h-10 items-center select-none border-b backdrop-blur ${baseBg}`}
            style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
        >
            {/* macOS: 좌측 traffic light 영역 80px 비움 (HD360 .tb--mac .tb__mac-spacer 정합) */}
            {isMac && <div className="w-20 shrink-0" />}

            {/* 중앙 컨텐츠 — drag 가능, 좌측 정렬 */}
            <div className="flex flex-1 items-center gap-2 px-3 min-w-0">
                <span className="text-xs font-semibold tracking-[0.3em] uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                    Face Authentication Access
                </span>
            </div>

            {/* 우측 window controls — no-drag */}
            <div
                className="flex items-center gap-1 pr-2"
                style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
                <button
                    onClick={handleMinimize}
                    aria-label="창 최소화"
                    className={`p-2 rounded-md transition ${btnHover}`}
                >
                    <Minus size={14} />
                </button>
                <button
                    onClick={handleMaximize}
                    aria-label="창 최대화"
                    className={`p-2 rounded-md transition ${btnHover}`}
                >
                    <Square size={14} />
                </button>
                <button
                    onClick={handleClose}
                    aria-label="창 닫기"
                    className="p-2 rounded-md transition hover:bg-red-500 hover:text-white text-zinc-500"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}

export default CustomTitleBar
