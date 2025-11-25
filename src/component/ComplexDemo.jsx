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
				title="✅ 完整的對話框實作"
				code={`<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
  aria-modal="true"
>
  <h2 id="dialog-title">...</h2>
  <p id="dialog-desc">...</p>
</div>`}
			>
				<div>
					<button
						onClick={() => setIsOpen(true)}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						開啟對話框
					</button>

					{isOpen && (
						<>
							<div
								className="fixed inset-0 bg-black bg-opacity-50"
								onClick={() => setIsOpen(false)}
							/>
							<div
								role="dialog"
								aria-labelledby="dialog-title"
								aria-describedby="dialog-desc"
								aria-modal="true"
								className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
							>
								<h2
									id="dialog-title"
									className="text-xl font-bold mb-2"
								>
									確認刪除
								</h2>
								<p id="dialog-desc" className="text-gray-600 mb-4">
									此操作無法復原，確定要刪除此項目嗎？
								</p>
								<div className="flex gap-2 justify-end">
									<button
										onClick={() => setIsOpen(false)}
										className="px-4 py-2 border rounded hover:bg-gray-100"
									>
										取消
									</button>
									<button
										onClick={() => {
											handleDelete();
											setIsOpen(false);
										}}
										className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
									>
										刪除
									</button>
								</div>
							</div>
						</>
					)}
				</div>
				<ExplanationBox>
					完整的對話框包含：role="dialog" 定義元素類型、aria-labelledby
					連結標題、aria-describedby 連結說明、aria-modal="true"
					表示模態對話框。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 動態通知 + 適當的 role"
				code={`<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
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
					{notification && (
						<div
							role="status"
							aria-live="polite"
							aria-atomic="true"
							className="mt-3 px-4 py-2 bg-green-100 text-green-800 rounded border border-green-300"
						>
							{notification}
						</div>
					)}
				</div>
				<ExplanationBox>
					aria-live="polite" 在使用者操作完成後通知、aria-atomic="true"
					完整讀出整個區域內容。螢幕閱讀器會自動讀出通知訊息。
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
