import { useRef, useState } from "react";

const TAB_ITEMS = [
	{ id: "overview", label: "總覽", panelId: "panel-overview", content: "概覽內容：用於摘要資訊。" },
	{ id: "settings", label: "設定", panelId: "panel-settings", content: "設定內容：調整偏好或通知。" },
	{ id: "profile", label: "個人檔案", panelId: "panel-profile", content: "個人檔案內容：顯示使用者資料。" },
];

function verifyTaiwanID(id) {
	if (typeof id !== "string") return false;
	const normalized = id.toUpperCase().trim();
	if (!/^[A-Z][0-9]{9}$/.test(normalized)) {
		return false;
	}

	const letterMap = {
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15,
		G: 16,
		H: 17,
		I: 34,
		J: 18,
		K: 19,
		L: 20,
		M: 21,
		N: 22,
		O: 35,
		P: 23,
		Q: 24,
		R: 25,
		S: 26,
		T: 27,
		U: 28,
		V: 29,
		W: 32,
		X: 30,
		Y: 31,
		Z: 33,
	};

	const first = normalized[0];
	const code = letterMap[first];
	if (code === undefined) return false;

	const digits = (code < 10 ? `0${code}` : String(code)) + normalized.slice(1);
	const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

	let sum = 0;
	for (let i = 0; i < weights.length; i += 1) {
		const d = parseInt(digits[i], 10);
		if (Number.isNaN(d)) return false;
		sum += d * weights[i];
	}

	return sum % 10 === 0;
}
import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function StatusDemo({ hasInteracted = false }) {
	const [triState, setTriState] = useState("false");
	const [isMuted, setIsMuted] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [isSectionOpen, setIsSectionOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState("overview");
	const tabRefs = useRef([]);
	const [idInput, setIdInput] = useState("");
	const [idError, setIdError] = useState("此欄位為必填");

	const cycleTriState = () => {
		setTriState((prev) => {
			if (prev === "false") return "mixed";
			if (prev === "mixed") return "true";
			return "false";
		});
	};

	const totalPages = 10;
	const goToPage = (page) => {
		const clamped = Math.min(Math.max(page, 1), totalPages);
		setCurrentPage(clamped);
	};

	const handleIdChange = (value) => {
		setIdInput(value);
		if (!value) {
			setIdError("此欄位為必填");
			return;
		}
		if (verifyTaiwanID(value)) {
			setIdError("");
		} else {
			setIdError("身份證檢核錯誤");
		}
	};

	const handleTabKeyDown = (event, index) => {
		const key = event.key;
		if (!["ArrowLeft", "ArrowRight", "Home", "End", "Enter", " "].includes(key)) return;

		event.preventDefault();
		if (key === "Enter" || key === " ") {
			const currentTab = TAB_ITEMS[index];
			setSelectedTab(currentTab.id);
			return;
		}

		let nextIndex = index;
		if (key === "ArrowLeft") {
			nextIndex = (index - 1 + TAB_ITEMS.length) % TAB_ITEMS.length;
		} else if (key === "ArrowRight") {
			nextIndex = (index + 1) % TAB_ITEMS.length;
		} else if (key === "Home") {
			nextIndex = 0;
		} else if (key === "End") {
			nextIndex = TAB_ITEMS.length - 1;
		}

		tabRefs.current[nextIndex]?.focus();
	};

	return (
		<div className="space-y-6">
			<DemoSection
				title="✅ 使用 aria-expanded 的 Disclosure 區塊"
				code={`<button type="button" aria-expanded="false" aria-controls="demo-panel">
	顯示更多
</button>
<div id="demo-panel" hidden>
	細節內容...
</div>`}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-700">
						用 aria-expanded 標明可展開/收合的控制項，輔助技術能報讀目前的開合狀態。
					</p>
					<button
						type="button"
						aria-expanded={isSectionOpen}
						aria-controls="section-demo-panel"
						onClick={() => setIsSectionOpen((open) => !open)}
						className="inline-flex items-center gap-2 px-4 py-2 rounded border bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<span className={`transition-transform ${isSectionOpen ? "rotate-90" : ""}`} aria-hidden="true">
							&gt;
						</span>
						<span>{isSectionOpen ? "隱藏說明" : "顯示說明"}</span>
					</button>
					<div
						id="section-demo-panel"
						hidden={!isSectionOpen}
						className="rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800"
					>
						<p className="mb-2 font-medium">Disclosure (Show/Hide) Pattern</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Enter 或 Space 觸發按鈕，切換內容顯示。</li>
							<li>按鈕 aria-expanded="true" 代表內容已展開，"false" 代表收合。</li>
							<li>aria-controls 連結到受控內容（可選），協助輔助技術對應控制與區塊。</li>
						</ul>
					</div>
					<p className="text-xs text-gray-600">
						目前 aria-expanded：{isSectionOpen ? "true（內容可見）" : "false（內容隱藏）"}
					</p>
				</div>
				<ExplanationBox>
					aria-expanded 放在能展開/收合內容的按鈕上，值同步反映內容顯示狀態；受控內容本身可用
					hidden 收合並搭配 aria-controls 供輔助技術建立對應。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 aria-selected 標註 Tab 選取"
				code={`<div role="tablist" aria-label="範例頁籤">
	<button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">總覽</button>
	<button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">設定</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">內容一</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>內容二</div>`}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-700">
						在 role="tab" 的按鈕上用 aria-selected 告知目前選取的頁籤，搭配 aria-controls/aria-labelledby 對應面板。
					</p>
					<div
						role="tablist"
						aria-label="範例頁籤"
						className="flex gap-2"
						onKeyDown={(event) => event.stopPropagation()}
					>
						{TAB_ITEMS.map((tab, index) => {
							const isActive = selectedTab === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									id={`tab-${tab.id}`}
									role="tab"
									ref={(el) => {
										tabRefs.current[index] = el;
									}}
									tabIndex={hasInteracted && isActive ? 0 : -1}
									aria-selected={isActive}
									aria-controls={tab.panelId}
									onClick={() => setSelectedTab(tab.id)}
									onKeyDown={(event) => handleTabKeyDown(event, index)}
									className={`px-3 py-1 rounded border ${
										isActive
											? "border-blue-500 bg-blue-50 text-blue-700"
											: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
									}`}
								>
									{tab.label}
								</button>
							);
						})}
					</div>
					<div className="space-y-2">
						{TAB_ITEMS.map((tab) => (
							<div
								key={tab.id}
								role="tabpanel"
								id={tab.panelId}
								aria-labelledby={`tab-${tab.id}`}
								hidden={selectedTab !== tab.id}
								className="rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800"
							>
								{tab.content}
							</div>
						))}
					</div>
					<p className="text-xs text-gray-600">
						目前 aria-selected：{selectedTab === "overview" ? "總覽" : selectedTab === "settings" ? "設定" : "個人檔案"}
					</p>
				</div>
				<ExplanationBox>
					Tab 介面中每個 role="tab" 使用 aria-selected 標示目前選取的頁籤；tabpanel 以 hidden 收合非當前內容並透過
					aria-labelledby 與 aria-controls 建立對應。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 aria-invalid / aria-describedby 表單錯誤提示"
				code={`<label for="tw-id">
	身份證字號
	<input id="tw-id" required aria-invalid="true" aria-describedby="tw-id-error" />
</label>
<span id="tw-id-error" role="alert">此欄位為必填</span>`}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-700">
						當必填或格式錯誤時以 aria-invalid 告知輸入錯誤，並用 aria-describedby 進行關聯。
					</p>
					<div className="space-y-1">
						<label htmlFor="tw-id" className="flex flex-col gap-1 text-sm text-gray-800">
							<span>身份證字號</span>
							<input
								id="tw-id"
								value={idInput}
								onChange={(event) => handleIdChange(event.target.value)}
								required
								aria-invalid={Boolean(idError)}
								aria-describedby={idError ? "tw-id-error" : undefined}
								className={`w-full rounded border px-3 py-2 ${
									idError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
								} focus:outline-none focus:ring-2`}
								placeholder="範例：A123456789"
							/>
						</label>
						<span
							id="tw-id-error"
							role={idError ? "alert" : "status"}
							aria-live={idError ? "assertive" : "polite"}
							className={`text-xs ${idError ? "text-red-600" : "text-green-600"}`}
						>
							{idError || "身份證檢核通過"}
						</span>
					</div>
					<ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
						<li>空白時顯示「此欄位為必填」並 aria-invalid="true"、描述連到錯誤訊息。</li>
						<li>輸入 1 碼以上就依檢核結果：通過 → aria-invalid="false" 並顯示「身份證檢核通過」；未通過 → aria-invalid="true" 並顯示「身份證檢核錯誤」。</li>
						<li>通過訊息使用 role="status"；錯誤訊息使用 role="alert" 讓螢幕閱讀器即時讀出。</li>
					</ul>
				</div>
				<ExplanationBox>
					必填欄位需搭配 required、aria-invalid、aria-describedby 連結到錯誤提示；錯誤時用 role="alert"
					通過時用 role="status" 讓訊息即時被螢幕閱讀器讀出。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 aria-pressed 切換按鈕"
				code={`<button type="button" aria-pressed="false">
	靜音
</button>`}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-700">
						用 aria-pressed 標明按下/未按下狀態。
					</p>
					<button
						type="button"
						onClick={() => setIsMuted((v) => !v)}
						aria-pressed={isMuted}
						className="inline-flex items-center gap-2 px-4 py-2 rounded border bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<span
							className="h-5 w-5"
							aria-hidden="true"
						>
							{isMuted ? (
								<svg viewBox="0 0 75 75" className="h-5 w-5 fill-current">
									<polygon
										points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
										className="stroke-current"
										style={{
											strokeWidth: 5,
											strokeLinejoin: "round",
											fill: "currentColor",
										}}
									/>
									<path
										d="M 48.651772,50.269646 69.395223,25.971024"
										className="stroke-current"
										style={{
											fill: "none",
											strokeWidth: 5,
											strokeLinecap: "round",
										}}
									/>
									<path
										d="M 69.395223,50.269646 48.651772,25.971024"
										className="stroke-current"
										style={{
											fill: "none",
											strokeWidth: 5,
											strokeLinecap: "round",
										}}
									/>
								</svg>
							) : (
								<svg viewBox="0 0 75 75" className="h-5 w-5 fill-current">
									<polygon
										points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
										className="stroke-current"
										style={{
											strokeWidth: 5,
											strokeLinejoin: "round",
											fill: "currentColor",
										}}
									/>
									<path
										d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
										className="stroke-current"
										style={{
											fill: "none",
											strokeWidth: 5,
											strokeLinecap: "round",
										}}
									/>
									<path
										d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
										className="stroke-current"
										style={{
											fill: "none",
											strokeWidth: 5,
											strokeLinecap: "round",
										}}
									/>
									<path
										d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
										className="stroke-current"
										style={{
											fill: "none",
											strokeWidth: 5,
											strokeLinecap: "round",
										}}
									/>
								</svg>
							)}
						</span>
						<span>靜音</span>
					</button>
					<p className="text-xs text-gray-600">
						目前狀態：{isMuted ? "按下 (aria-pressed=\"true\")" : "未按下 (aria-pressed=\"false\")"}
					</p>
				</div>
				<ExplanationBox>
					使用原生 &lt;button&gt; 並搭配 aria-pressed 呈現切換狀態，輔助技術能正確報讀按下/未按下語意。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title='✅ 使用 aria-current="page" 分頁頁數'
				code={`<button type="button" aria-current="page">
	第 3 頁
</button>`}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-700">
						用 aria-current="page" 標註目前所在頁，讓分頁按鈕有狀態語意。
					</p>
					<div className="flex flex-wrap items-center gap-2">
						<button
							type="button"
							onClick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							aria-label="上一頁"
							className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-50"
						>
							上一頁
						</button>
						{Array.from({ length: totalPages }, (_, index) => {
							const page = index + 1;
							const isActive = currentPage === page;
							return (
								<button
									key={page}
									type="button"
									onClick={() => goToPage(page)}
									aria-current={isActive ? "page" : undefined}
									className={`px-3 py-1 rounded border ${
										isActive
											? "bg-blue-50 border-blue-500 text-blue-700"
											: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
									}`}
								>
									{page}
								</button>
							);
						})}
						<button
							type="button"
							onClick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages}
							aria-label="下一頁"
							className="px-3 py-1 rounded border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-50"
						>
							下一頁
						</button>
					</div>
					<p className="text-xs text-gray-600">
						目前所在頁：第 {currentPage} / {totalPages} 頁
					</p>
				</div>
				<ExplanationBox>
					分頁是路徑的一部分，用 aria-current="page" 標明目前頁面，輔助技術能快速理解所在位置。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 aria-checked 部份勾選"
				code={`<div role="checkbox" aria-checked="mixed">
	部分勾選
</div>`}
			>
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<p className="text-sm text-gray-700">原生 checkbox 僅支援勾選/取消勾選</p>
						<input id="native-checkbox" type="checkbox" className="h-4 w-4" />
						<label htmlFor="native-checkbox" className="text-sm">
							原生 checkbox
						</label>
					</div>
						<div className="space-y-3">
						<p className="text-sm text-gray-700">自訂 checkbox 支援部分勾選</p>
						<button
							type="button"
							role="checkbox"
							aria-checked={triState === "mixed" ? "mixed" : triState === "true"}
							onClick={cycleTriState}
							className={`flex items-center gap-2 px-4 py-2 border rounded w-fit ${
								triState === "false"
									? "bg-white border-gray-300"
									: triState === "mixed"
										? "bg-yellow-50 border-yellow-300"
										: "bg-green-50 border-green-300"
							}`}
						>
							<span
								className={`h-4 w-4 border rounded flex items-center justify-center ${
									triState === "false"
										? "border-gray-300"
										: triState === "mixed"
											? "border-yellow-500 bg-yellow-100"
											: "border-green-600 bg-green-100"
								}`}
								aria-hidden="true"
							>
								{triState === "mixed" ? "—" : triState === "true" ? "✓" : ""}
							</span>
								<span className="text-sm">自訂 checkbox</span>
							</button>
							<p className="text-xs text-gray-600">
								目前狀態：
								{triState === "mixed"
									? "部分勾選 (aria-checked=\"mixed\")"
									: triState === "true"
										? "已勾選 (aria-checked=\"true\")"
										: "未勾選 (aria-checked=\"false\")"}
							</p>
					</div>
				</div>
				<ExplanationBox>
					原生 checkbox 只有 true/false，若需「部分勾選」需使用 role="checkbox"
					並將 aria-checked 設為 "mixed"。
				</ExplanationBox>
			</DemoSection>

		</div>
	);
}

export default StatusDemo;
