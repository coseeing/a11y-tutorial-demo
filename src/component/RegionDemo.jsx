import DemoSection from "./common/DemoSection";
import ExplanationBox from "./common/ExplanationBox";

function RegionDemo() {
	return (
		<div className="space-y-6">
			<DemoSection
				title="✅ header / main / footer 原生 landmark"
				code={`<header>
	<h1>示範網站</h1>
	<nav>導覽連結...</nav>
</header>
<main>
	<h2>最新消息</h2>
	<p>內容...</p>
</main>
<footer>版權資訊...</footer>`}
			>
				<div className="rounded border border-gray-200 bg-white">
					<header className="border-b border-gray-200 px-4 py-3 bg-gray-50">
						<h1 className="text-lg font-semibold">示範網站</h1>
						<nav aria-label="主導覽" className="mt-2 flex gap-3 text-sm text-blue-700">
							<a href="#news" className="hover:underline">
								最新消息
							</a>
							<a href="#service" className="hover:underline">
								服務介紹
							</a>
							<a href="#contact" className="hover:underline">
								聯絡我們
							</a>
						</nav>
					</header>
					<main id="news" className="px-4 py-3 space-y-2">
						<h2 className="text-base font-semibold">最新消息</h2>
						<p className="text-sm text-gray-700">
							本週新增無障礙相關課程，歡迎報名參與。
						</p>
						<section id="service" className="space-y-1">
							<h2 className="text-sm font-semibold">服務介紹</h2>
							<p className="text-sm text-gray-700">網站檢測、教育訓練、顧問諮詢。</p>
						</section>
					</main>
					<footer id="contact" className="border-t border-gray-200 px-4 py-3 text-sm text-gray-700 bg-gray-50">
						版權所有 © 2025，聯絡：coseeing@coseeing.org
					</footer>
				</div>
				<ExplanationBox>
					&lt;header&gt;、&lt;main&gt;、&lt;footer&gt; 預設即為 landmark（banner/main/contentinfo），有助輔助科技快速跳轉；
					只需以語意正確的原生標籤呈現，通常無須額外 aria-role。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 section 搭配 aria-label 形成 region"
				code={`<section aria-label="客服支援">
	<h2>客服支援</h2>
	<p>服務時間、聯絡方式...</p>
</section>
<section aria-label="常見問題">
	<h2>常見問題</h2>
	<p>Q1: ...</p>
</section>`}
			>
				<div className="space-y-4">
					<section aria-label="客服支援" className="rounded border border-gray-200 bg-white p-4 space-y-2">
						<h2 className="text-lg font-semibold">客服支援</h2>
						<p className="text-sm text-gray-700">服務時間：週一至週五 09:00–18:00。</p>
						<p className="text-sm text-gray-700">聯絡電話：02-1234-5678，Email：coseeing@coseeing.org</p>
					</section>
					<section aria-label="常見問題" className="rounded border border-gray-200 bg-white p-4 space-y-2">
						<h2 className="text-lg font-semibold">常見問題</h2>
						<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
							<li>怎麼修改密碼？到帳號設定頁即可更改。</li>
							<li>忘記密碼？使用忘記密碼連結收信重設。</li>
						</ul>
					</section>
				</div>
				<ExplanationBox>
					&lt;section&gt; 只有在有 aria-label 或 aria-labelledby 時才會被視為 region。
				</ExplanationBox>
			</DemoSection>

			<DemoSection
				title="✅ 使用 fieldset 搭配 legend 形成 group"
				code={`<fieldset>
	<legend>姓名</legend>
	<label>
		姓氏
		<input
		/>
	</label>
	<label>
		名字
		<input />
	</label>
</fieldset>
<fieldset>
	<legend>地址</legend>
	<label>
		縣市
		<input
		/>
	</label>
	<label>
		鄉鎮市區
		<input />
	</label>
	<label>
		道路街
		<input />
	</label>
</fieldset>`}
			>
				<div className="space-y-6">
					<fieldset className="border rounded p-4 space-y-2">
						<legend className="font-semibold px-2">姓名</legend>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<div>
								<label htmlFor="last-name" className="block mb-1">
									姓氏
								</label>
								<input
									id="last-name"
									type="text"
									className="px-3 py-2 border border-red-500 rounded w-full"
								/>
							</div>
							<div>
								<label htmlFor="first-name" className="block mb-1">
									名字
								</label>
								<input
									id="first-name"
									type="text"
									className="px-3 py-2 border rounded w-full"
								/>
							</div>
						</div>
					</fieldset>
					<fieldset className="border rounded p-4 space-y-2">
						<legend className="font-semibold px-2">地址</legend>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							<div>
								<label htmlFor="city" className="block mb-1">
									縣市
								</label>
								<input
									id="city"
									type="text"
									className="px-3 py-2 border border-red-500 rounded w-full"
								/>
							</div>
							<div>
								<label htmlFor="district" className="block mb-1">
									鄉鎮市區
								</label>
								<input
									id="district"
									type="text"
									className="px-3 py-2 border rounded w-full"
								/>
							</div>
							<div>
								<label htmlFor="street" className="block mb-1">
									道路街
								</label>
								<input
									id="street"
									type="text"
									className="px-3 py-2 border rounded w-full"
								/>
							</div>
						</div>
					</fieldset>
				</div>
				<ExplanationBox>
					&lt;fieldset&gt; 只有在有 &lt;legend&gt; 時才會被視為 group。
				</ExplanationBox>
			</DemoSection>
		</div>
	);
}

export default RegionDemo;
