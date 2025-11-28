import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function CorrectAriaDemo() {
	return (
		<div className="space-y-6">
			<DemoSection
				title="✅ aria-label：為元素提供簡短名稱"
				code={`<button aria-label="關閉對話框">
  ✕
</button>`}
			>
				<button
					aria-label="關閉對話框"
					className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
				>
					✕
				</button>
				<ExplanationBox>
					Accessibility tree 會顯示「關閉對話框」按鈕，而不是只有符號「✕」。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ aria-describedby：提供額外說明"
				code={`<input
  type="email"
  aria-describedby="email-hint"
/>
<p id="email-hint">
  我們會保護您的隱私
</p>`}
			>
				<div className="space-y-2">
					<label htmlFor="email-input" className="block font-medium">
						電子郵件
					</label>
					<input
						id="email-input"
						type="email"
						aria-describedby="email-hint"
						className="px-3 py-2 border rounded w-full max-w-md"
					/>
					<p id="email-hint" className="text-sm text-gray-600">
						我們會保護您的隱私，不會傳送垃圾郵件
					</p>
				</div>
				<ExplanationBox>
					螢幕閱讀器會同時讀出標籤和說明文字，提供完整資訊。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default CorrectAriaDemo;
