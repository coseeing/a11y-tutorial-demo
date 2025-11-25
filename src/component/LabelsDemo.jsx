import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function LabelsDemo() {
	return (
		<div className="space-y-6">
			{/* Input Label 比較 */}
			<div className="border-t-4 border-purple-500 pt-4">
				<h3 className="text-lg font-bold mb-4 text-purple-700">
					Input 的 Label 使用
				</h3>

				<DemoSection
					title="❌ 不好的做法：沒有 label 的 input"
					code={`<input type="text" placeholder="請輸入姓名" />`}
				>
					<input
						type="text"
						placeholder="請輸入姓名"
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox type="error">
						Accessibility tree 只會顯示「textbox」，沒有 accessible
						name。螢幕閱讀器使用者不知道這個欄位的用途。Placeholder
						不算是正式的 label。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="✅ 好的做法：使用 <label> 元素"
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
						使用 &lt;label&gt; 與 htmlFor 連結，accessibility tree 會顯示「姓名
						textbox」。點擊 label 也會聚焦到 input，提升使用體驗。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="✅ 另一種做法：包裹式 label"
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
						將 input 包在 &lt;label&gt; 內也能建立關聯，不需要 id/htmlFor，效果相同。
					</ExplanationBox>
				</DemoSection>
			</div>

			{/* Input aria-label vs title */}
			<div className="border-t-4 border-indigo-500 pt-4 mt-8">
				<h3 className="text-lg font-bold mb-4 text-indigo-700">
					Input：aria-label vs title
				</h3>

				<DemoSection
					title="使用 aria-label（優先選擇）"
					code={`<input
  type="text"
  aria-label="搜尋關鍵字"
/>`}
				>
					<input
						type="text"
						aria-label="搜尋關鍵字"
						placeholder="輸入關鍵字..."
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox>
						aria-label 會直接成為 accessibility tree 的 accessible
						name。螢幕閱讀器會讀出「搜尋關鍵字 textbox」。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="使用 title 屬性（不推薦用於 label）"
					code={`<input
  type="text"
  title="搜尋關鍵字"
/>`}
				>
					<input
						type="text"
						title="搜尋關鍵字"
						placeholder="輸入關鍵字..."
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox type="error">
						title 屬性在某些螢幕閱讀器可能被讀取，但不是標準做法。title
						主要用於顯示 tooltip（滑鼠懸停提示），不應該作為主要的 accessible
						name。某些行動裝置也無法觸發 tooltip。
					</ExplanationBox>
				</DemoSection>

				<DemoSection
					title="⚠️ 同時使用 aria-label 和 title"
					code={`<input
  type="text"
  aria-label="搜尋關鍵字"
  title="輸入產品名稱或類別"
/>`}
				>
					<input
						type="text"
						aria-label="搜尋關鍵字"
						title="輸入產品名稱或類別"
						placeholder="輸入關鍵字..."
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<ExplanationBox>
						當同時存在時，aria-label 優先作為 accessible name（螢幕閱讀器會讀「搜尋關鍵字」），title
						則顯示為 tooltip。可以用 title 提供補充說明。
					</ExplanationBox>
				</DemoSection>
			</div>

			{/* Image alt vs aria-label */}
			<div className="border-t-4 border-pink-500 pt-4 mt-8">
				<h3 className="text-lg font-bold mb-4 text-pink-700">
					Image：優先使用原生 alt 屬性
				</h3>

				<DemoSection
					title="✅ 推薦：使用 alt 屬性"
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
						<strong>重點：當圖片失效時，alt 文字會顯示在畫面上，讓所有使用者都能知道這裡應該有什麼內容。</strong>
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
						雖然 aria-label 在 accessibility tree 中有相同效果，但<strong>當圖片載入失敗時，aria-label 的文字不會顯示在網頁上</strong>，一般使用者會看到空白或破圖。
						<br /><br />
						<strong>原則：優先使用 HTML 原生語意屬性（如 alt），只在原生屬性無法滿足需求時才使用 ARIA。</strong>
					</ExplanationBox>
				</DemoSection>
			</div>

			{/* 優先順序總結 */}
			<div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6 mt-8">
				<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
					<span className="text-2xl">📊</span>
					Accessible Name 優先順序
				</h3>
				<div className="space-y-3 text-sm">
					<div className="bg-white rounded p-3 shadow-sm">
						<div className="font-bold text-blue-700 mb-1">1. aria-labelledby</div>
						<div className="text-gray-600">指向其他元素的 ID，使用該元素的文字內容</div>
					</div>
					<div className="bg-white rounded p-3 shadow-sm">
						<div className="font-bold text-blue-700 mb-1">2. aria-label</div>
						<div className="text-gray-600">直接提供的標籤文字（會覆蓋原有內容）</div>
					</div>
					<div className="bg-white rounded p-3 shadow-sm">
						<div className="font-bold text-blue-700 mb-1">3. &lt;label&gt; 或 alt</div>
						<div className="text-gray-600">HTML 原生語意屬性（推薦優先使用）</div>
					</div>
					<div className="bg-white rounded p-3 shadow-sm">
						<div className="font-bold text-blue-700 mb-1">4. title</div>
						<div className="text-gray-600">最低優先，主要用於 tooltip，不應作為主要 label</div>
					</div>
					<div className="bg-white rounded p-3 shadow-sm">
						<div className="font-bold text-blue-700 mb-1">5. placeholder</div>
						<div className="text-gray-600">不算是正式 label，僅作為提示文字</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LabelsDemo;
