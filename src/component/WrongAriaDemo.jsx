import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function WrongAriaDemo() {
	return (
		<div className="space-y-6">
			<DemoSection
				title="❌ 在語意元素上覆蓋 role"
				code={`<h5 role="link">
	點擊這裡
</h5>`}
			>
				<h5
					role="link"
					className="px-4 py-2"
				>
					點擊這裡
				</h5>
				<ExplanationBox type="error">
					Accessibility tree 會把這個 heading 視為連結，失去本來的語意。應該直接使用 &lt;a&gt; 元素。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 在 div 上使用 button role 但沒有鍵盤支援"
				code={`<div
	role="button"
	onClick={handleClick}
>
	送出
</div>`}
			>
				<div
					role="button"
					className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer"
				>
					送出
				</div>
				<ExplanationBox type="error">
					雖然有 role="button"，但無法用 Tab 聚焦。應該直接使用 &lt;button&gt; 元素。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 使用 role='presentation' 移除語意"
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
					中變成一般元素，可能造成非預期行為。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 不當使用 aria-hidden 隱藏內容"
				code={`<button aria-hidden="true">
	送出表單
</button>`}
			>
				<button
					aria-hidden="true"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					送出表單
				</button>
				<ExplanationBox type="error">
					aria-hidden="true" 會將元素從 accessibility tree 中完全隱藏，螢幕閱讀器無法讀取此按鈕，但視覺上仍可見，造成無障礙問題。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default WrongAriaDemo;
