import { useState } from "react";
import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function ComplexDemo() {
	const [notification, setNotification] = useState("");
	const [triState, setTriState] = useState("false");
	const [isMuted, setIsMuted] = useState(false);

	const handleDelete = () => {
		setNotification("項目已刪除");
		setTimeout(() => setNotification(""), 3000);
	};

	const cycleTriState = () => {
		setTriState((prev) => {
			if (prev === "false") return "mixed";
			if (prev === "mixed") return "true";
			return "false";
		});
	};

	return (
		<div className="space-y-6">
			<DemoSection
				title="✅ 動態通知 + 適當的 role"
				code={`<div
	role="status"
	aria-live="polite"
>
	{notification}
</div>`}
			>
				<div>
					<button
						onClick={handleDelete}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					>
						刪除項目
					</button>
					<div
						role="status"
						aria-live="polite"
						aria-atomic="true"
						className={`mt-3 px-4 py-2 rounded border transition-opacity ${
							notification
								? "bg-green-100 text-green-800 border-green-300 opacity-100"
								: "opacity-0 h-0 overflow-hidden"
						}`}
					>
						{notification || " "}
					</div>
				</div>
				<ExplanationBox>
					aria-live="polite" 在使用者操作完成後通知。螢幕閱讀器會自動讀出通知訊息。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default ComplexDemo;
