import { useState } from "react";
import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function ComplexDemo() {
	const [isOpen, setIsOpen] = useState(false);
	const [notification, setNotification] = useState("");

	const handleDelete = () => {
		setNotification("項目已刪除");
		setTimeout(() => setNotification(""), 3000);
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

			<DemoSection
				title="✅ 表單群組與錯誤提示"
				code={`<fieldset>
  <legend>個人資訊</legend>
  <input
    aria-invalid="true"
    aria-describedby="error-msg"
  />
  <span id="error-msg" role="alert">
    必填欄位
  </span>
</fieldset>`}
			>
				<fieldset className="border rounded p-4">
					<legend className="font-semibold px-2">個人資訊</legend>
					<div className="space-y-3">
						<div>
							<label htmlFor="name" className="block mb-1">
								姓名
							</label>
							<input
								id="name"
								type="text"
								aria-invalid="true"
								aria-describedby="name-error"
								className="px-3 py-2 border border-red-500 rounded w-full"
							/>
							<span
								id="name-error"
								role="alert"
								className="text-sm text-red-600 mt-1 block"
							>
								此欄位為必填
							</span>
						</div>
					</div>
				</fieldset>
				<ExplanationBox>
					使用 &lt;fieldset&gt; 和 &lt;legend&gt; 群組相關欄位、aria-invalid
					標示錯誤狀態、role="alert" 立即通知錯誤訊息。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default ComplexDemo;
