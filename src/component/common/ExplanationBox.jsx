const ExplanationBox = ({ children, type = "info" }) => {
	const styles = {
		info: "bg-blue-50 border-blue-200 text-blue-800",
		error: "bg-red-50 border-red-200 text-red-800",
	};

	return (
		<div className={`mt-3 p-3 rounded border text-sm ${styles[type]}`}>
			<p className="font-medium mb-1">
				{type === "error" ? "⚠️ 問題：" : "💡 說明："}
			</p>
			<p>{children}</p>
		</div>
	);
}

export default ExplanationBox;
