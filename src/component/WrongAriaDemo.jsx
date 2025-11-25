import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function WrongAriaDemo() {
	return (
		<div className="space-y-6">
			<DemoSection
				title="❌ 錯誤：在語意元素上覆蓋 role"
				code={`<button role="link">
  點擊這裡
</button>`}
			>
				<button
					role="link"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					點擊這裡
				</button>
				<ExplanationBox type="error">
					Accessibility tree 會把這個按鈕識別為連結，失去按鈕的語意（如按
					Space 鍵無法觸發）。應該直接使用 &lt;a&gt; 元素。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 錯誤：使用 role='presentation' 移除語意"
				code={`<button role="presentation">
  提交表單
</button>`}
			>
				<button
					role="presentation"
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
				>
					提交表單
				</button>
				<ExplanationBox type="error">
					role="presentation" 會移除按鈕的語意，在 accessibility tree
					中變成一般元素，失去互動性，鍵盤和螢幕閱讀器無法正確操作。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 錯誤：過度使用 aria-label 覆蓋原有內容"
				code={`<a
  href="/products"
  aria-label="點擊"
>
  查看所有產品
</a>`}
			>
				<a
					href="/products"
					aria-label="點擊"
					className="text-blue-600 underline"
				>
					查看所有產品
				</a>
				<ExplanationBox type="error">
					aria-label 會完全覆蓋原有文字，螢幕閱讀器只會讀出「點擊」而不是「查看所有產品」，失去重要資訊。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 錯誤：在 div 上使用 button role 但沒有鍵盤支援"
				code={`<div
  role="button"
  onClick={handleClick}
>
  送出
</div>`}
			>
				<div
					role="button"
					onClick={() => alert("clicked")}
					className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer"
				>
					送出
				</div>
				<ExplanationBox type="error">
					雖然有 role="button"，但無法用鍵盤操作（Tab、Space、Enter
					鍵）。應該直接使用 &lt;button&gt; 元素或加上 tabIndex 和鍵盤事件處理。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default WrongAriaDemo;
