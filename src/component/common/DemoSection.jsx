const DemoSection = ({ title, code, children }) => {
	return (
		<div className="border rounded-lg p-4 bg-gray-50">
			<h3 className="font-semibold mb-3 text-lg">{title}</h3>
			<div className="mb-4 bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
				<pre>
					<code>{code}</code>
				</pre>
			</div>
			<div className="bg-white p-4 rounded border">{children}</div>
		</div>
	);
};

export default DemoSection;
