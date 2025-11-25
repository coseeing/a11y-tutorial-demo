import { useState } from "react";
import TextVsIconDemo from "./TextVsIconDemo";
import LabelsDemo from "./LabelsDemo";
import CorrectAriaDemo from "./CorrectAriaDemo";
import WrongAriaDemo from "./WrongAriaDemo";
import ComplexDemo from "./ComplexDemo";

function A11yTreeDemo() {
	const [activeTab, setActiveTab] = useState("text");

	const demos = [
		{
			id: "text",
			title: "文字 vs Icon",
			description:
				"文字內容會自動出現在 accessibility tree 中，不需要額外的 aria-label",
		},
		{
			id: "labels",
			title: "Label & Alt 屬性",
			description: "展示 label、alt、aria-label、title 等屬性的差異",
		},
		{
			id: "aria",
			title: "正確使用 ARIA",
			description: "適當的 aria-label 和 aria-describedby 使用範例",
		},
		{
			id: "wrong",
			title: "錯誤的 ARIA 使用",
			description: "不當使用 role 會導致 accessibility tree 失去語意",
		},
		{
			id: "complex",
			title: "進階組合",
			description: "混合使用各種 ARIA 屬性的實際案例",
		},
	];

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">
				Accessibility Tree Demo
			</h1>
			<p className="text-gray-600 mb-8">
				展示不同元素在 accessibility tree 中的呈現方式
			</p>

			{/* Tab Navigation */}
			<div className="flex gap-2 mb-6 border-b">
				{demos.map((demo) => (
					<button
						key={demo.id}
						onClick={() => setActiveTab(demo.id)}
						className={`px-4 py-2 font-medium transition-colors ${
							activeTab === demo.id
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						{demo.title}
					</button>
				))}
			</div>

			{/* Demo Content */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold mb-2">
					{demos.find((d) => d.id === activeTab)?.title}
				</h2>
				<p className="text-gray-600 mb-6">
					{demos.find((d) => d.id === activeTab)?.description}
				</p>

				{activeTab === "text" && <TextVsIconDemo />}
				{activeTab === "labels" && <LabelsDemo />}
				{activeTab === "aria" && <CorrectAriaDemo />}
				{activeTab === "wrong" && <WrongAriaDemo />}
				{activeTab === "complex" && <ComplexDemo />}
			</div>

			{/* Instructions */}
			<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h3 className="font-semibold text-blue-900 mb-2">
					如何查看 Accessibility Tree
				</h3>
				<ul className="text-sm text-blue-800 space-y-1">
					<li>• Chrome DevTools: Elements → Accessibility 面板</li>
					<li>• Firefox DevTools: Accessibility 標籤</li>
					<li>
						• 使用螢幕閱讀器（如 NVDA, JAWS, VoiceOver）實際測試
					</li>
				</ul>
			</div>
		</div>
	);
}

export default A11yTreeDemo;
