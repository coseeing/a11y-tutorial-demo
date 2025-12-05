import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function TextVsIconDemo() {
	return (
		<div className="space-y-6">
			<DemoSection
				title="✅ 良好：使用文字按鈕"
				code={`<button>刪除</button>`}
			>
				<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
					刪除
				</button>
				<ExplanationBox>
					文字「刪除」會在 accessibility tree 中作為按鈕的
					accessible name，不需要額外設定。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="❌ 錯誤：僅使用 Icon 且沒有描述性文字"
				code={
					`<button><svg>...</svg></button>`
				}
			>
				<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6z" />
					</svg>
				</button>
				<ExplanationBox type="error">
					Accessibility tree 中只會顯示「button」，沒有任何描述性文字，螢幕閱讀器使用者無法理解按鈕功能。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 良好：Icon 加上 aria-label"
				code={
					`<button aria-label="刪除">
	<svg>...</svg>
</button>`
				}
			>
				<button
					aria-label="刪除"
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6z" />
					</svg>
				</button>
				<ExplanationBox>
					使用 aria-label 提供描述性文字，accessibility tree 會顯示「刪除」按鈕。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 良好：視覺隱藏文字，但在 DOM 上仍可見"
				code={
					`<button>
	<svg>...</svg>
	<span className="sr-only">刪除</span>
</button>`
				}
			>
				<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 relative">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6z" />
					</svg>
					<span className="sr-only">刪除</span>
				</button>
				<ExplanationBox>
					使用 sr-only class 視覺上隱藏，但在 DOM 中仍會顯示，因此 accessibility tree 中可見。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default TextVsIconDemo;
