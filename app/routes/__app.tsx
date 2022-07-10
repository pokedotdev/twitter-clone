import { Outlet } from '@remix-run/react'

export default function App() {
	return (
		<div className="flex justify-center">
			<div className="mdl:grid-cols-[auto_600px_minmax(auto,390px)] inline-grid grid-cols-[auto_minmax(auto,600px)]">
				{/* Header */}
				<div className="sticky top-0 z-10 col-start-1 row-start-1 flex h-16 flex-col px-0 sm:h-screen sm:px-[5px] md:px-3.5">
					{/* Nav */}
					<div className="hidden h-16 sm:block">Logo</div>
					<div className="fixed bottom-0 flex h-16 w-full flex-auto flex-col border-t border-slate-200 sm:static sm:bottom-auto sm:h-auto sm:border-none">
						<div className="min-w-60px xl:min-w-[247px]">nav</div>
					</div>
					{/* Account */}
					<div className="h-15 bg-white/80 backdrop-blur-lg md:my-3.5">
						account
					</div>
				</div>
				{/* Main */}
				<div className="sticky top-0 z-10 col-start-2 row-start-1 h-16 border-slate-200 bg-white/80 backdrop-blur-lg sm:border-x">
					{/* Get title from helper matches */}
					Page title
				</div>
				<main className="col-span-full col-start-1 row-start-1 mt-16 border-slate-200 sm:col-auto sm:col-start-2 sm:border-x">
					<Outlet />
				</main>
				{/* Sidebar */}
				<div className="lgx:pl-7.5 mdl:flex col-start-3 row-start-1 mb-12 hidden flex-col pl-5 pr-2.5">
					{/* display conditionally by page  */}
					<div className="sticky top-0 z-10 col-start-3 row-start-1 h-16 bg-white">
						Search
					</div>
					{/* get the list of widgets from helper matches */}
					<div className="sticky top-16 h-[1000px] bg-red-50">sidebar</div>
				</div>
			</div>
		</div>
	)
}
