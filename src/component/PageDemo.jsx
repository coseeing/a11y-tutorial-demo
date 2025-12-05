import { useState, useRef, useEffect } from "react";
import TextVsIconDemo from "./TextVsIconDemo";
import LabelsDemo from "./LabelsDemo";
import CorrectAriaDemo from "./CorrectAriaDemo";
import WrongAriaDemo from "./WrongAriaDemo";
import StatusDemo from "./StatusDemo";
import RegionDemo from "./RegionDemo";
import ComplexDemo from "./ComplexDemo";

function A11yTutorialDemo() {
	const [activeTab, setActiveTab] = useState("text");
	const tabRefs = useRef({});

	const demos = [
		{
			id: "text",
			title: "文字 vs Icon",
			description: "元素中的可見文字會自動成為 accessible name，但若元素僅包含 Icon 而沒有文字，則必須另外補上文字描述",
		},
		{
			id: "labels",
			title: "Input & Label",
			description: "label 標籤與 alt、aria-label、title 屬性的使用情境與差異",
		},
		{
			id: "aria",
			title: "正確的使用 ARIA",
			description: "accessibility name 與 accessibility description 的使用與差別",
		},
		{
			id: "wrong",
			title: "錯誤的使用 ARIA",
			description: "錯誤使用 role 與 ARIA 屬性可能造成的無障礙問題。",
		},
		{
			id: "status",
			title: "狀態",
			description: "正確標註元素的 status，讓輔助科技使用者了解當前狀態。",
		},
		{
			id: "region",
			title: "區塊",
			description: "正確劃分內容區塊，讓輔助科技使用者了解版面佈局。",
		},
		{
			id: "complex",
			title: "其他",
			description: "status message 與表單分組的無障礙技巧。",
		},
	];

	useEffect(() => {
		// 當 activeTab 改變時，將焦點移到新的 tab
		if (tabRefs.current[activeTab]) {
			tabRefs.current[activeTab].focus();
		}
	}, [activeTab]);

	const handleKeyDown = (e, index) => {
		let newIndex = index;
		if (e.key === "ArrowLeft") {
			newIndex = index > 0 ? index - 1 : demos.length - 1;
		} else if (e.key === "ArrowRight") {
			newIndex = index < demos.length - 1 ? index + 1 : 0;
		} else {
			return;
		}
		e.preventDefault();
		setActiveTab(demos[newIndex].id);
	};

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">
				114 年數位無障礙課程
			</h1>
			<p className="text-gray-600 mb-8">
				開啟螢幕閱讀器 NVDA 和瀏覽器的 accessibility tree 瞧瞧吧！
			</p>

			{/* Tab Navigation */}
			<div role="tablist" className="flex gap-2 mb-6 border-b">
				{demos.map((demo, index) => (
					<button
						key={demo.id}
						ref={(el) => (tabRefs.current[demo.id] = el)}
						role="tab"
						id={`tab-${demo.id}`}
						aria-selected={activeTab === demo.id}
						aria-controls={`panel-${demo.id}`}
						tabIndex={activeTab === demo.id ? 0 : -1}
						onClick={() => setActiveTab(demo.id)}
						onKeyDown={(e) => handleKeyDown(e, index)}
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
			<div
				role="tabpanel"
				id={`panel-${activeTab}`}
				aria-labelledby={`tab-${activeTab}`}
				className="bg-white rounded-lg shadow-md p-6"
			>
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
				{activeTab === "status" && <StatusDemo />}
				{activeTab === "region" && <RegionDemo />}
				{activeTab === "complex" && <ComplexDemo />}
			</div>
		</div>
	);
}

export default A11yTutorialDemo;
