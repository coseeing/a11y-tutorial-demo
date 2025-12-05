import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function LabelsDemo() {
	return (
		<div className="space-y-6">
			<div className="border-t-4 border-purple-500 pt-4">
				<h4 className="text-lg font-bold mb-4 text-purple-700">
					優先使用可見文字的設計：Input 搭配 Label 的使用
				</h4>

				<DemoSection
					title="❌ 錯誤：沒有正確關聯 label"
					code={`<label>姓名</label>
<input id="name" type="text" />`}
				>
					<div className="space-y-2">
						<label className="block font-medium">
							姓名
						</label>
						<input
							type="text"
							className="px-3 py-2 border rounded w-full max-w-md"
						/>
					</div>
					<ExplanationBox>
						input 沒有關聯 label，accessibility tree 顯示空值
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="✅ 正確：使用 <label> 與 for 屬性"
					code={`<label htmlFor="name">姓名</label>
<input id="name" type="text" />`}
				>
					<div className="space-y-2">
						<label htmlFor="name-input" className="block font-medium">
							姓名
						</label>
						<input
							id="name-input"
							type="text"
							className="px-3 py-2 border rounded w-full max-w-md"
						/>
					</div>
					<ExplanationBox>
						使用 &lt;label&gt; 與 htmlFor 連結，accessibility tree 顯示「姓名
						textbox」。點擊 label 會聚焦到 input 。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="✅ 正確：使用 <label> 並包住 <input>"
					code={`<label>
	姓名
	<input type="text" />
</label>`}
				>
					<label className="block">
						<span className="font-medium">姓名</span>
						<input
							type="text"
							className="mt-2 px-3 py-2 border rounded w-full max-w-md block"
						/>
					</label>
					<ExplanationBox>
						將 input 包在 &lt;label&gt; 內也能建立關聯，可取代 for 屬性用法，效果相同。
					</ExplanationBox>
				</DemoSection>
			</div>

			{/* Input aria-label vs title */}
			<div className="border-t-4 border-indigo-500 pt-4 mt-8">
				<h4 className="text-lg font-bold mb-4 text-indigo-700">
					避免依賴瀏覽器的後備機制：Input aria-label vs title
				</h4>

				<DemoSection
					title="⚠ 不推薦：沒有 label 的 input"
					code={`<input type="text" placeholder="請輸入關鍵字..." />`}
				>
					<input
						type="text"
						placeholder="請輸入關鍵字..."
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
				</DemoSection>

				<DemoSection
					title="✅ 正確：使用 aria-label"
					code={`<input
	type="text"
	aria-label="搜尋關鍵字"
/>`}
				>
					<input
						type="text"
						aria-label="搜尋關鍵字"
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox>
						accessibility tree 會顯示 aria-label 的值。螢幕閱讀器會讀出「搜尋關鍵字 編輯區」。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="❌ 錯誤：僅使用 title 或 placeholder 屬性"
					code={`<input
	type="text"
	title="輸入關鍵字"
	placeholder="請輸入關鍵字..."
/>`}
				>
					<input
						type="text"
						title="輸入關鍵字"
						placeholder="請輸入關鍵字..."
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox type="error">
						title 屬性在某些螢幕閱讀器可能被讀取，但不是標準做法。title
						主要用於顯示 tooltip（滑鼠懸停提示），不應該作為 accessible
						name 的來源。某些行動裝置可能無法觸發 tooltip。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="✅ 正確：同時使用 aria-label 和 title"
					code={`<input
	type="text"
	aria-label="搜尋關鍵字"
	placeholder="請輸入關鍵字..."
	title="輸入關鍵字"
/>`}
				>
					<input
						type="text"
						aria-label="搜尋關鍵字"
						placeholder="請輸入關鍵字..."
						title="輸入關鍵字"
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox>
						當 aria-label 與 title 同時存在時，aria-label 優先作為 accessible name 的來源。螢幕閱讀器會讀「搜尋關鍵字」），
						title 則顯示為 tooltip，用於提供補充說明。
					</ExplanationBox>
				</DemoSection>
			</div>

			{/* Image alt vs aria-label */}
			<div className="border-t-4 border-pink-500 pt-4 mt-8">
				<h4 className="text-lg font-bold mb-4 text-pink-700">
					優先使用原生技術：Image alt vs aria-label
				</h4>

				<DemoSection
					title="✅ 正確：使用 alt 屬性"
					code={`<img
	src="logo.png"
	alt="公司標誌"
/>`}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white font-bold text-2xl">
								<img alt="公司標誌" />
							</div>
							<code className="text-sm bg-gray-100 px-2 py-1 rounded">
								alt="公司標誌"
							</code>
						</div>
						<div className="text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-200">
							<strong>圖片載入失敗時：</strong>替代文字 &ldquo;公司標誌&rdquo; 會顯示在網頁上
						</div>
					</div>
					<ExplanationBox>
						alt 是 HTML 原生屬性，accessibility tree 會顯示「公司標誌 image」。
						<strong>當圖片失效時，alt 文字會顯示在畫面上，讓所有使用者都能知道這裡應該有什麼內容。</strong>
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="⚠️ 不推薦：使用 aria-label"
					code={`<img
	src="logo.png"
	aria-label="公司標誌"
/>`}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center text-white font-bold text-2xl">
								<img aria-label="公司標誌" />
							</div>
							<code className="text-sm bg-gray-100 px-2 py-1 rounded">
								aria-label="公司標誌"
							</code>
						</div>
						<div className="text-sm text-orange-700 bg-orange-50 p-3 rounded border border-orange-200">
							<strong>圖片載入失敗時：</strong>網頁上不會顯示任何文字，只有破圖圖示
						</div>
					</div>
					<ExplanationBox type="error">
						雖然 aria-label 能在 accessibility tree 上顯示，與 alt 類似，但<strong>當圖片載入失敗時，aria-label 的文字不會顯示在頁面上</strong>，一般使用者會看到空白或破圖。
					</ExplanationBox>
				</DemoSection>
			</div>

		</div>
	);
}

export default LabelsDemo;
