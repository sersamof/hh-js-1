function memoize(fun) {
	let computed = null;
	return () => {
		if (computed === null) {
			computed = fun();
		}
		return computed;
	}
}

function node(fun) {
	const graphNode = memoize(fun);
	graphNode.toString = graphNode.valueOf = () => graphNode();
	return graphNode;
}

function stats(xs) {
	const n = node(() => xs.length);
	const m = node(() => xs.reduce((acc, val) => acc + val, 0) / n());
	const m2 = node(() => xs.reduce((acc, val) => acc + val * val, 0) / n());
	const v = node(() => m2() - m() * m());
	return { n, m, m2, v };
}

const t = stats([1,2,3,4]);
console.log(t.n, t.m, t.m2, t.v);