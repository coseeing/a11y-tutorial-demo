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

			<DemoSection
				title="✅ role 與 aria-live：動態更新通知"
				code={`<div
  role="status"
  aria-live="polite"
>
  已儲存變更
</div>`}
			>
				<div className="space-y-3">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
						儲存
					</button>
					<div
						role="status"
						aria-live="polite"
						className="px-4 py-2 bg-green-100 text-green-800 rounded border border-green-300"
					>
						✓ 已成功儲存變更
					</div>
				</div>
				<ExplanationBox>
					使用 role="status" 和 aria-live="polite"
					讓螢幕閱讀器自動通知使用者狀態變更。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default CorrectAriaDemo;
