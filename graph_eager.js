function stats(xs) {
	const n = () => xs.length;
	const m = () => xs.reduce((acc, val) => acc + val, 0) / n();
	const m2 = () => xs.reduce((acc, val) => acc + val * val, 0) / n();
	const v = () => m2() - Math.pow(m(), 2);
	return {
		n: n(),
		m: m(),
		m2: m2(),
		v: v()
	}
}

const t = stats([1,2,3,4]);
console.log(t.n, t.m, t.m2, t.v);