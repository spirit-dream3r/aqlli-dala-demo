(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/leaf.js [app-client] (ecmascript) <export default as Leaf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const fmt = new Intl.NumberFormat('ru-RU');
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function Card(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638";
    }
    const { children, className } = t0;
    let t1;
    if ($[1] !== className) {
        t1 = cn("rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur", className);
        $[1] = className;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== children || $[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 35,
            columnNumber: 10
        }, this);
        $[3] = children;
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c = Card;
function Pill(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638";
    }
    const { children } = t0;
    let t1;
    if ($[1] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c1 = Pill;
function Page() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(592);
    if ($[0] !== "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638") {
        for(let $i = 0; $i < 592; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "22f785016253830d71b0ce6e8b9d3c40875d1f3d24583ec7898e5c3331afd638";
    }
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ru");
    let t0;
    if ($[1] !== lang) {
        t0 = ({
            "Page[t]": (ru, uz)=>lang === "ru" ? ru : uz
        })["Page[t]"];
        $[1] = lang;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const t = t0;
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            {
                time: "06:00",
                top20: 26,
                root40: 34,
                threshold: 25
            },
            {
                time: "08:00",
                top20: 24,
                root40: 33,
                threshold: 25
            },
            {
                time: "10:00",
                top20: 22,
                root40: 31,
                threshold: 25
            },
            {
                time: "12:00",
                top20: 19,
                root40: 29,
                threshold: 25
            },
            {
                time: "14:00",
                top20: 18,
                root40: 27,
                threshold: 25
            },
            {
                time: "16:00",
                top20: 20,
                root40: 26,
                threshold: 25
            },
            {
                time: "18:00",
                top20: 23,
                root40: 28,
                threshold: 25
            },
            {
                time: "20:00",
                top20: 25,
                root40: 30,
                threshold: 25
            }
        ];
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const moisture = t1;
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [
            {
                week: "W1",
                before: 120,
                after: 92
            },
            {
                week: "W2",
                before: 118,
                after: 86
            },
            {
                week: "W3",
                before: 124,
                after: 90
            },
            {
                week: "W4",
                before: 121,
                after: 88
            }
        ];
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const waterBeforeAfter = t2;
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = [
            {
                month: "1",
                revenue: 8,
                cost: 90
            },
            {
                month: "2",
                revenue: 16,
                cost: 90
            },
            {
                month: "3",
                revenue: 24,
                cost: 90
            },
            {
                month: "4",
                revenue: 32,
                cost: 90
            },
            {
                month: "5",
                revenue: 40,
                cost: 90
            },
            {
                month: "6",
                revenue: 48,
                cost: 90
            },
            {
                month: "7",
                revenue: 56,
                cost: 90
            },
            {
                month: "8",
                revenue: 64,
                cost: 90
            },
            {
                month: "9",
                revenue: 72,
                cost: 90
            },
            {
                month: "10",
                revenue: 80,
                cost: 90
            },
            {
                month: "11",
                revenue: 88,
                cost: 90
            },
            {
                month: "12",
                revenue: 96,
                cost: 90
            },
            {
                month: "14",
                revenue: 112,
                cost: 90
            },
            {
                month: "16",
                revenue: 128,
                cost: 90
            },
            {
                month: "18",
                revenue: 144,
                cost: 90
            }
        ];
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const payback = t3;
    const avgBefore = waterBeforeAfter.reduce(_PageWaterBeforeAfterReduce, 0) / waterBeforeAfter.length;
    const avgAfter = waterBeforeAfter.reduce(_PageWaterBeforeAfterReduce2, 0) / waterBeforeAfter.length;
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = Math.round((avgBefore - avgAfter) / avgBefore * 100);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    const savingPct = t4;
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            savingPct,
            avgBefore: Math.round(avgBefore),
            avgAfter: Math.round(avgAfter)
        };
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    const kpis = t5;
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-none fixed inset-0 opacity-70",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 249,
                    columnNumber: 72
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-48 left-16 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 249,
                    columnNumber: 193
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-emerald-500/10 blur-3xl"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 249,
                    columnNumber: 293
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 249,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                className: "h-5 w-5"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 256,
                columnNumber: 84
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 256,
            columnNumber: 10
        }, this);
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: "Aqlli Dala"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 263,
            columnNumber: 10
        }, this);
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== t) {
        t9 = t("AgTech \u2022 \u0423\u043C\u043D\u044B\u0439 \u043F\u043E\u043B\u0438\u0432", "AgTech \u2022 Aqlli sug\u2018orish");
        $[11] = t;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "flex items-center gap-3 transition-opacity hover:opacity-80",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "leading-tight",
                    children: [
                        t8,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-white/60",
                            children: t9
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 278,
                            columnNumber: 137
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 278,
                    columnNumber: 102
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 278,
            columnNumber: 11
        }, this);
        $[13] = t9;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
            className: "h-3.5 w-3.5 text-cyan-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 286,
            columnNumber: 11
        }, this);
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== t) {
        t12 = t("LoRaWAN \u2022 \u0431\u0435\u0437 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430", "LoRaWAN \u2022 internet shartsiz");
        $[16] = t;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 301,
            columnNumber: 11
        }, this);
        $[18] = t12;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "Page[<button>.onClick]": ()=>setLang("ru")
        })["Page[<button>.onClick]"];
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    const t15 = lang === "ru" ? "bg-white/15" : "text-white/70 hover:text-white";
    let t16;
    if ($[21] !== t15) {
        t16 = cn("rounded-full px-3 py-1 text-xs", t15);
        $[21] = t15;
        $[22] = t16;
    } else {
        t16 = $[22];
    }
    let t17;
    if ($[23] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t14,
            className: t16,
            children: "RU"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[23] = t16;
        $[24] = t17;
    } else {
        t17 = $[24];
    }
    let t18;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = ({
            "Page[<button>.onClick]": ()=>setLang("uz")
        })["Page[<button>.onClick]"];
        $[25] = t18;
    } else {
        t18 = $[25];
    }
    const t19 = lang === "uz" ? "bg-white/15" : "text-white/70 hover:text-white";
    let t20;
    if ($[26] !== t19) {
        t20 = cn("rounded-full px-3 py-1 text-xs", t19);
        $[26] = t19;
        $[27] = t20;
    } else {
        t20 = $[27];
    }
    let t21;
    if ($[28] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t18,
            className: t20,
            children: "UZ"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 353,
            columnNumber: 11
        }, this);
        $[28] = t20;
        $[29] = t21;
    } else {
        t21 = $[29];
    }
    let t22;
    if ($[30] !== t17 || $[31] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ml-2 flex rounded-full border border-white/10 bg-white/5 p-1",
            children: [
                t17,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        $[30] = t17;
        $[31] = t21;
        $[32] = t22;
    } else {
        t22 = $[32];
    }
    let t23;
    if ($[33] !== t) {
        t23 = t("\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u043C\u043E", "Demoni ko\u2018rish");
        $[33] = t;
        $[34] = t23;
    } else {
        t23 = $[34];
    }
    let t24;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[35] = t24;
    } else {
        t24 = $[35];
    }
    let t25;
    if ($[36] !== t23) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "#demo",
            className: "ml-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#070A12] hover:bg-white/90",
            children: [
                t23,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[36] = t23;
        $[37] = t25;
    } else {
        t25 = $[37];
    }
    let t26;
    if ($[38] !== t13 || $[39] !== t22 || $[40] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t13,
                t22,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[38] = t13;
        $[39] = t22;
        $[40] = t25;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    if ($[42] !== t10 || $[43] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/60 backdrop-blur",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3",
                children: [
                    t10,
                    t26
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 403,
                columnNumber: 104
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[42] = t10;
        $[43] = t26;
        $[44] = t27;
    } else {
        t27 = $[44];
    }
    let t28;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
            className: "h-3.5 w-3.5 text-indigo-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        $[45] = t28;
    } else {
        t28 = $[45];
    }
    let t29;
    if ($[46] !== t) {
        t29 = t("\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u0438 20/40 \u0441\u043C", "Namlik nazorati 20/40 sm");
        $[46] = t;
        $[47] = t29;
    } else {
        t29 = $[47];
    }
    let t30;
    if ($[48] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 427,
            columnNumber: 11
        }, this);
        $[48] = t29;
        $[49] = t30;
    } else {
        t30 = $[49];
    }
    let t31;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
            className: "h-3.5 w-3.5 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 435,
            columnNumber: 11
        }, this);
        $[50] = t31;
    } else {
        t31 = $[50];
    }
    let t32;
    if ($[51] !== t) {
        t32 = t("IP67 \u2022 \u0434\u043B\u044F \u0436\u0430\u0440\u044B \u0438 \u043F\u044B\u043B\u0438", "IP67 \u2022 issiq va chang uchun");
        $[51] = t;
        $[52] = t32;
    } else {
        t32 = $[52];
    }
    let t33;
    if ($[53] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t31,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 450,
            columnNumber: 11
        }, this);
        $[53] = t32;
        $[54] = t33;
    } else {
        t33 = $[54];
    }
    let t34;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
            className: "h-3.5 w-3.5 text-amber-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 458,
            columnNumber: 11
        }, this);
        $[55] = t34;
    } else {
        t34 = $[55];
    }
    let t35;
    if ($[56] !== t) {
        t35 = t("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432 Telegram", "Telegram ogohlantirishlari");
        $[56] = t;
        $[57] = t35;
    } else {
        t35 = $[57];
    }
    let t36;
    if ($[58] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 473,
            columnNumber: 11
        }, this);
        $[58] = t35;
        $[59] = t36;
    } else {
        t36 = $[59];
    }
    let t37;
    if ($[60] !== t30 || $[61] !== t33 || $[62] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: [
                t30,
                t33,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 481,
            columnNumber: 11
        }, this);
        $[60] = t30;
        $[61] = t33;
        $[62] = t36;
        $[63] = t37;
    } else {
        t37 = $[63];
    }
    let t38;
    if ($[64] !== t) {
        t38 = t("\u042D\u043A\u043E\u043D\u043E\u043C\u044C\u0442\u0435 \u0432\u043E\u0434\u0443 \u0438 \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u2014 \u043F\u043E\u043B\u0438\u0432\u0430\u0439\u0442\u0435 \u043F\u043E \u0434\u0430\u043D\u043D\u044B\u043C, \u0430 \u043D\u0435 \u201C\u043D\u0430 \u0433\u043B\u0430\u0437\u201D.", "Suv va elektrni tejang \u2014 \u201Cko\u2018z bilan\u201D emas, ma\u2019lumot bilan sug\u2018oring.");
        $[64] = t;
        $[65] = t38;
    } else {
        t38 = $[65];
    }
    let t39;
    if ($[66] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "mt-6 text-4xl font-semibold leading-tight md:text-5xl",
            children: t38
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 499,
            columnNumber: 11
        }, this);
        $[66] = t38;
        $[67] = t39;
    } else {
        t39 = $[67];
    }
    let t40;
    if ($[68] !== t) {
        t40 = t("Aqlli Dala \u2014 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u044B\u0435 \u0434\u0430\u0442\u0447\u0438\u043A\u0438 \u0432\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u0438 + LoRaWAN + Telegram-\u0431\u043E\u0442. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0442\u0430\u043C, \u0433\u0434\u0435 \u043D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438. \u0414\u0430\u0435\u0442 \u043F\u0440\u043E\u0441\u0442\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F: \u043F\u043E\u043B\u0438\u0432\u0430\u0442\u044C / \u043F\u043E\u0434\u043E\u0436\u0434\u0430\u0442\u044C.", "Aqlli Dala \u2014 avtonom namlik datchiklari + LoRaWAN + Telegram-bot. Aloqa bo\u2018lmagan joyda ham ishlaydi. Oddiy qaror: sug\u2018orish / kutish.");
        $[68] = t;
        $[69] = t40;
    } else {
        t40 = $[69];
    }
    let t41;
    if ($[70] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-5 max-w-xl text-base text-white/70",
            children: t40
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 515,
            columnNumber: 11
        }, this);
        $[70] = t40;
        $[71] = t41;
    } else {
        t41 = $[71];
    }
    let t42;
    if ($[72] !== t) {
        t42 = t("\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0438\u043B\u043E\u0442", "Pilot so\u2018rash");
        $[72] = t;
        $[73] = t42;
    } else {
        t42 = $[73];
    }
    let t43;
    if ($[74] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 531,
            columnNumber: 11
        }, this);
        $[74] = t43;
    } else {
        t43 = $[74];
    }
    let t44;
    if ($[75] !== t42) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "#contact",
            className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90",
            children: [
                t42,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 538,
            columnNumber: 11
        }, this);
        $[75] = t42;
        $[76] = t44;
    } else {
        t44 = $[76];
    }
    let t45;
    if ($[77] !== t) {
        t45 = t("\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442", "Qanday ishlaydi");
        $[77] = t;
        $[78] = t45;
    } else {
        t45 = $[78];
    }
    let t46;
    if ($[79] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "#how",
            className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10",
            children: t45
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 554,
            columnNumber: 11
        }, this);
        $[79] = t45;
        $[80] = t46;
    } else {
        t46 = $[80];
    }
    let t47;
    if ($[81] !== t44 || $[82] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 flex flex-col gap-3 sm:flex-row",
            children: [
                t44,
                t46
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 562,
            columnNumber: 11
        }, this);
        $[81] = t44;
        $[82] = t46;
        $[83] = t47;
    } else {
        t47 = $[83];
    }
    let t48;
    if ($[84] !== t) {
        t48 = t("\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0432\u043E\u0434\u044B", "Suv tejalishi");
        $[84] = t;
        $[85] = t48;
    } else {
        t48 = $[85];
    }
    let t49;
    if ($[86] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t48
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 579,
            columnNumber: 11
        }, this);
        $[86] = t48;
        $[87] = t49;
    } else {
        t49 = $[87];
    }
    let t50;
    if ($[88] === Symbol.for("react.memo_cache_sentinel")) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-2xl font-semibold",
            children: [
                kpis.savingPct,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 587,
            columnNumber: 11
        }, this);
        $[88] = t50;
    } else {
        t50 = $[88];
    }
    let t51;
    if ($[89] !== t49) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t49,
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 594,
            columnNumber: 11
        }, this);
        $[89] = t49;
        $[90] = t51;
    } else {
        t51 = $[90];
    }
    let t52;
    if ($[91] !== t) {
        t52 = t("\u0414\u043E (\u0441\u0440.)", "Oldin (o\u2018rt.)");
        $[91] = t;
        $[92] = t52;
    } else {
        t52 = $[92];
    }
    let t53;
    if ($[93] !== t52) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t52
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 610,
            columnNumber: 11
        }, this);
        $[93] = t52;
        $[94] = t53;
    } else {
        t53 = $[94];
    }
    let t54;
    if ($[95] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-2xl font-semibold",
            children: kpis.avgBefore
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 618,
            columnNumber: 11
        }, this);
        $[95] = t54;
    } else {
        t54 = $[95];
    }
    let t55;
    if ($[96] !== t) {
        t55 = t("\u043C\xB3/\u043D\u0435\u0434", "m\xB3/hafta");
        $[96] = t;
        $[97] = t55;
    } else {
        t55 = $[97];
    }
    let t56;
    if ($[98] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/50",
            children: t55
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 633,
            columnNumber: 11
        }, this);
        $[98] = t55;
        $[99] = t56;
    } else {
        t56 = $[99];
    }
    let t57;
    if ($[100] !== t53 || $[101] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t53,
                t54,
                t56
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 641,
            columnNumber: 11
        }, this);
        $[100] = t53;
        $[101] = t56;
        $[102] = t57;
    } else {
        t57 = $[102];
    }
    let t58;
    if ($[103] !== t) {
        t58 = t("\u041F\u043E\u0441\u043B\u0435 (\u0441\u0440.)", "Keyin (o\u2018rt.)");
        $[103] = t;
        $[104] = t58;
    } else {
        t58 = $[104];
    }
    let t59;
    if ($[105] !== t58) {
        t59 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t58
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 658,
            columnNumber: 11
        }, this);
        $[105] = t58;
        $[106] = t59;
    } else {
        t59 = $[106];
    }
    let t60;
    if ($[107] === Symbol.for("react.memo_cache_sentinel")) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-2xl font-semibold",
            children: kpis.avgAfter
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 666,
            columnNumber: 11
        }, this);
        $[107] = t60;
    } else {
        t60 = $[107];
    }
    let t61;
    if ($[108] !== t) {
        t61 = t("\u043C\xB3/\u043D\u0435\u0434", "m\xB3/hafta");
        $[108] = t;
        $[109] = t61;
    } else {
        t61 = $[109];
    }
    let t62;
    if ($[110] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/50",
            children: t61
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 681,
            columnNumber: 11
        }, this);
        $[110] = t61;
        $[111] = t62;
    } else {
        t62 = $[111];
    }
    let t63;
    if ($[112] !== t59 || $[113] !== t62) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t59,
                t60,
                t62
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 689,
            columnNumber: 11
        }, this);
        $[112] = t59;
        $[113] = t62;
        $[114] = t63;
    } else {
        t63 = $[114];
    }
    let t64;
    if ($[115] !== t51 || $[116] !== t57 || $[117] !== t63) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-10 grid grid-cols-3 gap-4",
            children: [
                t51,
                t57,
                t63
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 698,
            columnNumber: 11
        }, this);
        $[115] = t51;
        $[116] = t57;
        $[117] = t63;
        $[118] = t64;
    } else {
        t64 = $[118];
    }
    let t65;
    if ($[119] !== t37 || $[120] !== t39 || $[121] !== t41 || $[122] !== t47 || $[123] !== t64) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t37,
                t39,
                t41,
                t47,
                t64
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 708,
            columnNumber: 11
        }, this);
        $[119] = t37;
        $[120] = t39;
        $[121] = t41;
        $[122] = t47;
        $[123] = t64;
        $[124] = t65;
    } else {
        t65 = $[124];
    }
    let t66;
    if ($[125] !== t) {
        t66 = t("\u0414\u0435\u043C\u043E: \u201C\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043F\u043E\u043B\u044F\u201D", "Demo: \u201CMaydon holati\u201D");
        $[125] = t;
        $[126] = t66;
    } else {
        t66 = $[126];
    }
    let t67;
    if ($[127] !== t66) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t66
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 728,
            columnNumber: 11
        }, this);
        $[127] = t66;
        $[128] = t67;
    } else {
        t67 = $[128];
    }
    let t68;
    if ($[129] !== t) {
        t68 = t("\u041F\u0440\u0438\u043C\u0435\u0440 \u0434\u0430\u043D\u043D\u044B\u0445 \u0437\u0430 \u0434\u0435\u043D\u044C (20\u0441\u043C \u0438 40\u0441\u043C)", "Kunlik misol (20sm va 40sm)");
        $[129] = t;
        $[130] = t68;
    } else {
        t68 = $[130];
    }
    let t69;
    if ($[131] !== t68) {
        t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-xs text-white/60",
            children: t68
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 744,
            columnNumber: 11
        }, this);
        $[131] = t68;
        $[132] = t69;
    } else {
        t69 = $[132];
    }
    let t70;
    if ($[133] !== t67 || $[134] !== t69) {
        t70 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t67,
                t69
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 752,
            columnNumber: 11
        }, this);
        $[133] = t67;
        $[134] = t69;
        $[135] = t70;
    } else {
        t70 = $[135];
    }
    let t71;
    if ($[136] === Symbol.for("react.memo_cache_sentinel")) {
        t71 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 761,
            columnNumber: 11
        }, this);
        $[136] = t71;
    } else {
        t71 = $[136];
    }
    let t72;
    if ($[137] !== t) {
        t72 = t("\u041E\u043D\u043B\u0430\u0439\u043D", "Onlayn");
        $[137] = t;
        $[138] = t72;
    } else {
        t72 = $[138];
    }
    let t73;
    if ($[139] !== t72) {
        t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t71,
                t72
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 776,
            columnNumber: 11
        }, this);
        $[139] = t72;
        $[140] = t73;
    } else {
        t73 = $[140];
    }
    let t74;
    if ($[141] !== t70 || $[142] !== t73) {
        t74 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t70,
                t73
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 784,
            columnNumber: 11
        }, this);
        $[141] = t70;
        $[142] = t73;
        $[143] = t74;
    } else {
        t74 = $[143];
    }
    let t75;
    let t76;
    if ($[144] === Symbol.for("react.memo_cache_sentinel")) {
        t75 = {
            top: 10,
            right: 10,
            left: -10,
            bottom: 0
        };
        t76 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
            strokeDasharray: "4 4",
            opacity: 0.15
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 800,
            columnNumber: 11
        }, this);
        $[144] = t75;
        $[145] = t76;
    } else {
        t75 = $[144];
        t76 = $[145];
    }
    let t77;
    if ($[146] === Symbol.for("react.memo_cache_sentinel")) {
        t77 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "time",
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 809,
            columnNumber: 11
        }, this);
        $[146] = t77;
    } else {
        t77 = $[146];
    }
    let t78;
    if ($[147] === Symbol.for("react.memo_cache_sentinel")) {
        t78 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 819,
            columnNumber: 11
        }, this);
        $[147] = t78;
    } else {
        t78 = $[147];
    }
    let t79;
    if ($[148] === Symbol.for("react.memo_cache_sentinel")) {
        t79 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            contentStyle: {
                background: "rgba(10,12,20,0.95)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                color: "white"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 829,
            columnNumber: 11
        }, this);
        $[148] = t79;
    } else {
        t79 = $[148];
    }
    let t80;
    if ($[149] === Symbol.for("react.memo_cache_sentinel")) {
        t80 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            wrapperStyle: {
                color: "rgba(255,255,255,0.7)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 841,
            columnNumber: 11
        }, this);
        $[149] = t80;
    } else {
        t80 = $[149];
    }
    let t81;
    if ($[150] !== t) {
        t81 = t("\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C 20\u0441\u043C", "Namlik 20sm");
        $[150] = t;
        $[151] = t81;
    } else {
        t81 = $[151];
    }
    let t82;
    if ($[152] !== t81) {
        t82 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
            type: "monotone",
            dataKey: "top20",
            name: t81,
            stroke: "#22d3ee",
            strokeWidth: 2,
            dot: false
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 858,
            columnNumber: 11
        }, this);
        $[152] = t81;
        $[153] = t82;
    } else {
        t82 = $[153];
    }
    let t83;
    if ($[154] !== t) {
        t83 = t("\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C 40\u0441\u043C", "Namlik 40sm");
        $[154] = t;
        $[155] = t83;
    } else {
        t83 = $[155];
    }
    let t84;
    if ($[156] !== t83) {
        t84 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
            type: "monotone",
            dataKey: "root40",
            name: t83,
            stroke: "#34d399",
            strokeWidth: 2,
            dot: false
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 874,
            columnNumber: 11
        }, this);
        $[156] = t83;
        $[157] = t84;
    } else {
        t84 = $[157];
    }
    let t85;
    if ($[158] !== t) {
        t85 = t("\u041F\u043E\u0440\u043E\u0433", "Chegara");
        $[158] = t;
        $[159] = t85;
    } else {
        t85 = $[159];
    }
    let t86;
    if ($[160] !== t85) {
        t86 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
            type: "monotone",
            dataKey: "threshold",
            name: t85,
            stroke: "#fbbf24",
            strokeWidth: 1,
            strokeDasharray: "5 5",
            dot: false
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 890,
            columnNumber: 11
        }, this);
        $[160] = t85;
        $[161] = t86;
    } else {
        t86 = $[161];
    }
    let t87;
    if ($[162] !== t82 || $[163] !== t84 || $[164] !== t86) {
        t87 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 h-64 w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: moisture,
                    margin: t75,
                    children: [
                        t76,
                        t77,
                        t78,
                        t79,
                        t80,
                        t82,
                        t84,
                        t86
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 898,
                    columnNumber: 66
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 898,
                columnNumber: 45
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 898,
            columnNumber: 11
        }, this);
        $[162] = t82;
        $[163] = t84;
        $[164] = t86;
        $[165] = t87;
    } else {
        t87 = $[165];
    }
    let t88;
    if ($[166] !== t) {
        t88 = t("\u0421\u0442\u0430\u0442\u0443\u0441", "Holat");
        $[166] = t;
        $[167] = t88;
    } else {
        t88 = $[167];
    }
    let t89;
    if ($[168] !== t88) {
        t89 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t88
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 916,
            columnNumber: 11
        }, this);
        $[168] = t88;
        $[169] = t89;
    } else {
        t89 = $[169];
    }
    let t90;
    if ($[170] !== t) {
        t90 = t("\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435", "Diqqat");
        $[170] = t;
        $[171] = t90;
    } else {
        t90 = $[171];
    }
    let t91;
    if ($[172] !== t90) {
        t91 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-sm font-semibold text-amber-200",
            children: t90
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 932,
            columnNumber: 11
        }, this);
        $[172] = t90;
        $[173] = t91;
    } else {
        t91 = $[173];
    }
    let t92;
    if ($[174] !== t89 || $[175] !== t91) {
        t92 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t89,
                t91
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 940,
            columnNumber: 11
        }, this);
        $[174] = t89;
        $[175] = t91;
        $[176] = t92;
    } else {
        t92 = $[176];
    }
    let t93;
    if ($[177] !== t) {
        t93 = t("\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F", "Tavsiya");
        $[177] = t;
        $[178] = t93;
    } else {
        t93 = $[178];
    }
    let t94;
    if ($[179] !== t93) {
        t94 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t93
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 957,
            columnNumber: 11
        }, this);
        $[179] = t93;
        $[180] = t94;
    } else {
        t94 = $[180];
    }
    let t95;
    if ($[181] !== t) {
        t95 = t("\u041F\u043E\u043B\u0438\u0442\u044C 1\u20132 \u0447\u0430\u0441\u0430", "1\u20132 soat sug\u2018oring");
        $[181] = t;
        $[182] = t95;
    } else {
        t95 = $[182];
    }
    let t96;
    if ($[183] !== t95) {
        t96 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-sm font-semibold",
            children: t95
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 973,
            columnNumber: 11
        }, this);
        $[183] = t95;
        $[184] = t96;
    } else {
        t96 = $[184];
    }
    let t97;
    if ($[185] !== t94 || $[186] !== t96) {
        t97 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t94,
                t96
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 981,
            columnNumber: 11
        }, this);
        $[185] = t94;
        $[186] = t96;
        $[187] = t97;
    } else {
        t97 = $[187];
    }
    let t98;
    if ($[188] !== t) {
        t98 = t("\u041A\u0430\u043D\u0430\u043B", "Kanal");
        $[188] = t;
        $[189] = t98;
    } else {
        t98 = $[189];
    }
    let t99;
    if ($[190] !== t98) {
        t99 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t98
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 998,
            columnNumber: 11
        }, this);
        $[190] = t98;
        $[191] = t99;
    } else {
        t99 = $[191];
    }
    let t100;
    if ($[192] === Symbol.for("react.memo_cache_sentinel")) {
        t100 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-sm font-semibold",
            children: "Telegram"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1006,
            columnNumber: 12
        }, this);
        $[192] = t100;
    } else {
        t100 = $[192];
    }
    let t101;
    if ($[193] !== t99) {
        t101 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "p-4",
            children: [
                t99,
                t100
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1013,
            columnNumber: 12
        }, this);
        $[193] = t99;
        $[194] = t101;
    } else {
        t101 = $[194];
    }
    let t102;
    if ($[195] !== t101 || $[196] !== t92 || $[197] !== t97) {
        t102 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 grid grid-cols-3 gap-3",
            children: [
                t92,
                t97,
                t101
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1021,
            columnNumber: 12
        }, this);
        $[195] = t101;
        $[196] = t92;
        $[197] = t97;
        $[198] = t102;
    } else {
        t102 = $[198];
    }
    let t103;
    if ($[199] !== t102 || $[200] !== t74 || $[201] !== t87) {
        t103 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            className: "h-fit",
            children: [
                t74,
                t87,
                t102
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1031,
            columnNumber: 12
        }, this);
        $[199] = t102;
        $[200] = t74;
        $[201] = t87;
        $[202] = t103;
    } else {
        t103 = $[202];
    }
    let t104;
    if ($[203] !== t103 || $[204] !== t65) {
        t104 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:py-20",
                children: [
                    t65,
                    t103
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1041,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1041,
            columnNumber: 12
        }, this);
        $[203] = t103;
        $[204] = t65;
        $[205] = t104;
    } else {
        t104 = $[205];
    }
    let t105;
    if ($[206] !== t) {
        t105 = t("\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442", "Qanday ishlaydi");
        $[206] = t;
        $[207] = t105;
    } else {
        t105 = $[207];
    }
    let t106;
    if ($[208] !== t105) {
        t106 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-semibold",
            children: t105
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1058,
            columnNumber: 12
        }, this);
        $[208] = t105;
        $[209] = t106;
    } else {
        t106 = $[209];
    }
    let t107;
    if ($[210] !== t) {
        t107 = t("\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u0431\u043E\u0440: \u0434\u0430\u0442\u0447\u0438\u043A \u0432 \u0437\u0435\u043C\u043B\u0435 \u2192 LoRaWAN-\u0448\u043B\u044E\u0437 \u2192 \u0441\u0435\u0440\u0432\u0435\u0440 \u2192 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0432 Telegram.", "Minimal to\u2018plam: datchik yerda \u2192 LoRaWAN shlyuz \u2192 server \u2192 Telegram xabari.");
        $[210] = t;
        $[211] = t107;
    } else {
        t107 = $[211];
    }
    let t108;
    if ($[212] !== t107) {
        t108 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 max-w-2xl text-sm text-white/70",
            children: t107
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1074,
            columnNumber: 12
        }, this);
        $[212] = t107;
        $[213] = t108;
    } else {
        t108 = $[213];
    }
    let t109;
    if ($[214] === Symbol.for("react.memo_cache_sentinel")) {
        t109 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                className: "h-5 w-5"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1082,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1082,
            columnNumber: 12
        }, this);
        $[214] = t109;
    } else {
        t109 = $[214];
    }
    let t110;
    if ($[215] !== t) {
        t110 = t("1) \u0414\u0430\u0442\u0447\u0438\u043A\u0438", "1) Datchiklar");
        $[215] = t;
        $[216] = t110;
    } else {
        t110 = $[216];
    }
    let t111;
    if ($[217] !== t110) {
        t111 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t110
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1097,
            columnNumber: 12
        }, this);
        $[217] = t110;
        $[218] = t111;
    } else {
        t111 = $[218];
    }
    let t112;
    if ($[219] !== t) {
        t112 = t("\u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C/\u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430", "Namlik/harorat");
        $[219] = t;
        $[220] = t112;
    } else {
        t112 = $[220];
    }
    let t113;
    if ($[221] !== t112) {
        t113 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t112
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1113,
            columnNumber: 12
        }, this);
        $[221] = t112;
        $[222] = t113;
    } else {
        t113 = $[222];
    }
    let t114;
    if ($[223] !== t111 || $[224] !== t113) {
        t114 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t109,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t111,
                        t113
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1121,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1121,
            columnNumber: 12
        }, this);
        $[223] = t111;
        $[224] = t113;
        $[225] = t114;
    } else {
        t114 = $[225];
    }
    let t115;
    if ($[226] !== t) {
        t115 = t("\u0418\u0437\u043C\u0435\u0440\u044F\u0435\u043C \u043A\u043E\u0440\u043D\u0435\u0432\u0443\u044E \u0437\u043E\u043D\u0443 (20\u201340 \u0441\u043C), \u0433\u0434\u0435 \u201C\u0440\u0435\u0448\u0430\u0435\u0442\u0441\u044F\u201D \u0443\u0440\u043E\u0436\u0430\u0439.", "Ildiz zonasini o\u2018lchaymiz (20\u201340 sm) \u2014 hosil shu yerda hal bo\u2018ladi.");
        $[226] = t;
        $[227] = t115;
    } else {
        t115 = $[227];
    }
    let t116;
    if ($[228] !== t115) {
        t116 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 text-sm text-white/70",
            children: t115
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1138,
            columnNumber: 12
        }, this);
        $[228] = t115;
        $[229] = t116;
    } else {
        t116 = $[229];
    }
    let t117;
    if ($[230] !== t114 || $[231] !== t116) {
        t117 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t114,
                t116
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1146,
            columnNumber: 12
        }, this);
        $[230] = t114;
        $[231] = t116;
        $[232] = t117;
    } else {
        t117 = $[232];
    }
    let t118;
    if ($[233] === Symbol.for("react.memo_cache_sentinel")) {
        t118 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                className: "h-5 w-5"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1155,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1155,
            columnNumber: 12
        }, this);
        $[233] = t118;
    } else {
        t118 = $[233];
    }
    let t119;
    if ($[234] !== t) {
        t119 = t("2) \u0421\u0432\u044F\u0437\u044C LoRaWAN", "2) LoRaWAN aloqa");
        $[234] = t;
        $[235] = t119;
    } else {
        t119 = $[235];
    }
    let t120;
    if ($[236] !== t119) {
        t120 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t119
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1170,
            columnNumber: 12
        }, this);
        $[236] = t119;
        $[237] = t120;
    } else {
        t120 = $[237];
    }
    let t121;
    if ($[238] !== t) {
        t121 = t("\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0431\u0435\u0437 3G/4G", "3G/4G siz ishlaydi");
        $[238] = t;
        $[239] = t121;
    } else {
        t121 = $[239];
    }
    let t122;
    if ($[240] !== t121) {
        t122 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t121
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1186,
            columnNumber: 12
        }, this);
        $[240] = t121;
        $[241] = t122;
    } else {
        t122 = $[241];
    }
    let t123;
    if ($[242] !== t120 || $[243] !== t122) {
        t123 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t118,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t120,
                        t122
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1194,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1194,
            columnNumber: 12
        }, this);
        $[242] = t120;
        $[243] = t122;
        $[244] = t123;
    } else {
        t123 = $[244];
    }
    let t124;
    if ($[245] !== t) {
        t124 = t("\u041E\u0434\u0438\u043D \u0448\u043B\u044E\u0437 \u043F\u043E\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0445\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E. \u0414\u0430\u0442\u0447\u0438\u043A\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442 \u0434\u0430\u043D\u043D\u044B\u0435 \u0440\u0435\u0434\u043A\u043E \u0438 \u044D\u043A\u043E\u043D\u043E\u043C\u043D\u043E.", "Bitta shlyuz xo\u2018jalikni qoplaydi. Datchiklar kam va tejamkor uzatadi.");
        $[245] = t;
        $[246] = t124;
    } else {
        t124 = $[246];
    }
    let t125;
    if ($[247] !== t124) {
        t125 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 text-sm text-white/70",
            children: t124
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1211,
            columnNumber: 12
        }, this);
        $[247] = t124;
        $[248] = t125;
    } else {
        t125 = $[248];
    }
    let t126;
    if ($[249] !== t123 || $[250] !== t125) {
        t126 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t123,
                t125
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1219,
            columnNumber: 12
        }, this);
        $[249] = t123;
        $[250] = t125;
        $[251] = t126;
    } else {
        t126 = $[251];
    }
    let t127;
    if ($[252] === Symbol.for("react.memo_cache_sentinel")) {
        t127 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                className: "h-5 w-5"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1228,
                columnNumber: 86
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1228,
            columnNumber: 12
        }, this);
        $[252] = t127;
    } else {
        t127 = $[252];
    }
    let t128;
    if ($[253] !== t) {
        t128 = t("3) \u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u0438 \u043E\u0442\u0447\u0451\u0442", "3) Qaror va hisobot");
        $[253] = t;
        $[254] = t128;
    } else {
        t128 = $[254];
    }
    let t129;
    if ($[255] !== t128) {
        t129 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t128
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1243,
            columnNumber: 12
        }, this);
        $[255] = t128;
        $[256] = t129;
    } else {
        t129 = $[256];
    }
    let t130;
    if ($[257] !== t) {
        t130 = t("\u041F\u043E\u043B\u0438\u0432\u0430\u0442\u044C / \u0436\u0434\u0430\u0442\u044C", "Sug\u2018orish / kutish");
        $[257] = t;
        $[258] = t130;
    } else {
        t130 = $[258];
    }
    let t131;
    if ($[259] !== t130) {
        t131 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t130
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1259,
            columnNumber: 12
        }, this);
        $[259] = t130;
        $[260] = t131;
    } else {
        t131 = $[260];
    }
    let t132;
    if ($[261] !== t129 || $[262] !== t131) {
        t132 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t127,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t129,
                        t131
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1267,
                    columnNumber: 59
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1267,
            columnNumber: 12
        }, this);
        $[261] = t129;
        $[262] = t131;
        $[263] = t132;
    } else {
        t132 = $[263];
    }
    let t133;
    if ($[264] !== t) {
        t133 = t("Telegram-\u0431\u043E\u0442 \u0434\u0430\u0451\u0442 \u043F\u0440\u043E\u0441\u0442\u0443\u044E \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044E \u0438 \u0432\u044B\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u043E\u0442\u0447\u0451\u0442 \u201C\u0434\u043E/\u043F\u043E\u0441\u043B\u0435\u201D.", "Telegram-bot oddiy tavsiya beradi va \u201Coldin/keyin\u201D hisobot chiqaradi.");
        $[264] = t;
        $[265] = t133;
    } else {
        t133 = $[265];
    }
    let t134;
    if ($[266] !== t133) {
        t134 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 text-sm text-white/70",
            children: t133
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1284,
            columnNumber: 12
        }, this);
        $[266] = t133;
        $[267] = t134;
    } else {
        t134 = $[267];
    }
    let t135;
    if ($[268] !== t132 || $[269] !== t134) {
        t135 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t132,
                t134
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1292,
            columnNumber: 12
        }, this);
        $[268] = t132;
        $[269] = t134;
        $[270] = t135;
    } else {
        t135 = $[270];
    }
    let t136;
    if ($[271] !== t117 || $[272] !== t126 || $[273] !== t135) {
        t136 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 grid grid-cols-1 gap-4 md:grid-cols-3",
            children: [
                t117,
                t126,
                t135
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1301,
            columnNumber: 12
        }, this);
        $[271] = t117;
        $[272] = t126;
        $[273] = t135;
        $[274] = t136;
    } else {
        t136 = $[274];
    }
    let t137;
    if ($[275] !== t106 || $[276] !== t108 || $[277] !== t136) {
        t137 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "how",
            className: "relative border-t border-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-4 py-14",
                children: [
                    t106,
                    t108,
                    t136
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1311,
                columnNumber: 76
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1311,
            columnNumber: 12
        }, this);
        $[275] = t106;
        $[276] = t108;
        $[277] = t136;
        $[278] = t137;
    } else {
        t137 = $[278];
    }
    let t138;
    if ($[279] !== t) {
        t138 = t("\u041E\u043D\u043B\u0430\u0439\u043D-\u0434\u0435\u043C\u043E: \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0438 \u043E\u043A\u0443\u043F\u0430\u0435\u043C\u043E\u0441\u0442\u044C", "Onlayn demo: tejalish va qaytish");
        $[279] = t;
        $[280] = t138;
    } else {
        t138 = $[280];
    }
    let t139;
    if ($[281] !== t138) {
        t139 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-semibold",
            children: t138
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1329,
            columnNumber: 12
        }, this);
        $[281] = t138;
        $[282] = t139;
    } else {
        t139 = $[282];
    }
    let t140;
    if ($[283] !== t) {
        t140 = t("\u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435. \u0412 \u043F\u0438\u043B\u043E\u0442\u0435 \u0432\u044B \u0431\u0443\u0434\u0435\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0446\u0438\u0444\u0440\u044B \u201C\u043D\u0430\u0441\u043E\u0441/\u0432\u043E\u0434\u0430/\u0433\u0440\u0430\u0444\u0438\u043A\u0438 \u0432\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u0438\u201D.", "Quyidagi ma\u2019lumotlar demo. Pilotda real \u201Cnasos/suv/namlik grafigi\u201D bo\u2018ladi.");
        $[283] = t;
        $[284] = t140;
    } else {
        t140 = $[284];
    }
    let t141;
    if ($[285] !== t140) {
        t141 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 max-w-2xl text-sm text-white/70",
            children: t140
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1345,
            columnNumber: 12
        }, this);
        $[285] = t140;
        $[286] = t141;
    } else {
        t141 = $[286];
    }
    let t142;
    if ($[287] !== t139 || $[288] !== t141) {
        t142 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t139,
                t141
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1353,
            columnNumber: 12
        }, this);
        $[287] = t139;
        $[288] = t141;
        $[289] = t142;
    } else {
        t142 = $[289];
    }
    let t143;
    if ($[290] === Symbol.for("react.memo_cache_sentinel")) {
        t143 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__["Leaf"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1362,
            columnNumber: 12
        }, this);
        $[290] = t143;
    } else {
        t143 = $[290];
    }
    let t144;
    if ($[291] !== t) {
        t144 = t("\u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043F\u043E\u0434 ESG/\u0433\u0440\u0430\u043D\u0442\u044B", "ESG/grantlar uchun mos");
        $[291] = t;
        $[292] = t144;
    } else {
        t144 = $[292];
    }
    let t145;
    if ($[293] !== t144) {
        t145 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
            children: [
                t143,
                t144
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1377,
            columnNumber: 12
        }, this);
        $[293] = t144;
        $[294] = t145;
    } else {
        t145 = $[294];
    }
    let t146;
    if ($[295] !== t142 || $[296] !== t145) {
        t146 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2 md:flex-row md:items-end md:justify-between",
            children: [
                t142,
                t145
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1385,
            columnNumber: 12
        }, this);
        $[295] = t142;
        $[296] = t145;
        $[297] = t146;
    } else {
        t146 = $[297];
    }
    let t147;
    if ($[298] !== t) {
        t147 = t("\u0412\u043E\u0434\u0430: \u0434\u043E/\u043F\u043E\u0441\u043B\u0435 (\u043C\xB3 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E)", "Suv: oldin/keyin (m\xB3/hafta)");
        $[298] = t;
        $[299] = t147;
    } else {
        t147 = $[299];
    }
    let t148;
    if ($[300] !== t147) {
        t148 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t147
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1402,
            columnNumber: 12
        }, this);
        $[300] = t147;
        $[301] = t148;
    } else {
        t148 = $[301];
    }
    let t149;
    if ($[302] !== t) {
        t149 = t("\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 4 \u043D\u0435\u0434\u0435\u043B\u044C", "4 haftalik taqqoslash");
        $[302] = t;
        $[303] = t149;
    } else {
        t149 = $[303];
    }
    let t150;
    if ($[304] !== t149) {
        t150 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-xs text-white/60",
            children: t149
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1418,
            columnNumber: 12
        }, this);
        $[304] = t149;
        $[305] = t150;
    } else {
        t150 = $[305];
    }
    let t151;
    let t152;
    if ($[306] === Symbol.for("react.memo_cache_sentinel")) {
        t151 = {
            top: 10,
            right: 10,
            left: -10,
            bottom: 0
        };
        t152 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
            strokeDasharray: "4 4",
            opacity: 0.15
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1433,
            columnNumber: 12
        }, this);
        $[306] = t151;
        $[307] = t152;
    } else {
        t151 = $[306];
        t152 = $[307];
    }
    let t153;
    if ($[308] === Symbol.for("react.memo_cache_sentinel")) {
        t153 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "week",
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1442,
            columnNumber: 12
        }, this);
        $[308] = t153;
    } else {
        t153 = $[308];
    }
    let t154;
    if ($[309] === Symbol.for("react.memo_cache_sentinel")) {
        t154 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1452,
            columnNumber: 12
        }, this);
        $[309] = t154;
    } else {
        t154 = $[309];
    }
    let t155;
    if ($[310] === Symbol.for("react.memo_cache_sentinel")) {
        t155 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            contentStyle: {
                background: "rgba(10,12,20,0.95)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                color: "white"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1462,
            columnNumber: 12
        }, this);
        $[310] = t155;
    } else {
        t155 = $[310];
    }
    let t156;
    if ($[311] === Symbol.for("react.memo_cache_sentinel")) {
        t156 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            wrapperStyle: {
                color: "rgba(255,255,255,0.7)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1474,
            columnNumber: 12
        }, this);
        $[311] = t156;
    } else {
        t156 = $[311];
    }
    let t157;
    if ($[312] !== t) {
        t157 = t("\u0414\u043E", "Oldin");
        $[312] = t;
        $[313] = t157;
    } else {
        t157 = $[313];
    }
    let t158;
    if ($[314] === Symbol.for("react.memo_cache_sentinel")) {
        t158 = [
            4,
            4,
            0,
            0
        ];
        $[314] = t158;
    } else {
        t158 = $[314];
    }
    let t159;
    if ($[315] !== t157) {
        t159 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
            dataKey: "before",
            name: t157,
            fill: "#6366f1",
            radius: t158
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1498,
            columnNumber: 12
        }, this);
        $[315] = t157;
        $[316] = t159;
    } else {
        t159 = $[316];
    }
    let t160;
    if ($[317] !== t) {
        t160 = t("\u041F\u043E\u0441\u043B\u0435", "Keyin");
        $[317] = t;
        $[318] = t160;
    } else {
        t160 = $[318];
    }
    let t161;
    if ($[319] === Symbol.for("react.memo_cache_sentinel")) {
        t161 = [
            4,
            4,
            0,
            0
        ];
        $[319] = t161;
    } else {
        t161 = $[319];
    }
    let t162;
    if ($[320] !== t160) {
        t162 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
            dataKey: "after",
            name: t160,
            fill: "#34d399",
            radius: t161
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1521,
            columnNumber: 12
        }, this);
        $[320] = t160;
        $[321] = t162;
    } else {
        t162 = $[321];
    }
    let t163;
    if ($[322] !== t159 || $[323] !== t162) {
        t163 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 h-72",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: waterBeforeAfter,
                    margin: t151,
                    children: [
                        t152,
                        t153,
                        t154,
                        t155,
                        t156,
                        t159,
                        t162
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1529,
                    columnNumber: 60
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1529,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1529,
            columnNumber: 12
        }, this);
        $[322] = t159;
        $[323] = t162;
        $[324] = t163;
    } else {
        t163 = $[324];
    }
    let t164;
    if ($[325] !== t) {
        t164 = t("\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F:", "O\u2018rtacha tejalish:");
        $[325] = t;
        $[326] = t164;
    } else {
        t164 = $[326];
    }
    let t165;
    if ($[327] === Symbol.for("react.memo_cache_sentinel")) {
        t165 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-semibold",
            children: [
                kpis.savingPct,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1546,
            columnNumber: 12
        }, this);
        $[327] = t165;
    } else {
        t165 = $[327];
    }
    let t166;
    if ($[328] !== t164) {
        t166 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 text-sm text-white/80",
            children: [
                t164,
                " ",
                t165
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1553,
            columnNumber: 12
        }, this);
        $[328] = t164;
        $[329] = t166;
    } else {
        t166 = $[329];
    }
    let t167;
    if ($[330] !== t148 || $[331] !== t150 || $[332] !== t163 || $[333] !== t166) {
        t167 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t148,
                t150,
                t163,
                t166
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1561,
            columnNumber: 12
        }, this);
        $[330] = t148;
        $[331] = t150;
        $[332] = t163;
        $[333] = t166;
        $[334] = t167;
    } else {
        t167 = $[334];
    }
    let t168;
    if ($[335] !== t) {
        t168 = t("\u041E\u043A\u0443\u043F\u0430\u0435\u043C\u043E\u0441\u0442\u044C (\u0432\u044B\u0440\u0443\u0447\u043A\u0430 vs. \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438)", "Qaytish (tushum vs. o\u2018rnatish xarajati)");
        $[335] = t;
        $[336] = t168;
    } else {
        t168 = $[336];
    }
    let t169;
    if ($[337] !== t168) {
        t169 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t168
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1580,
            columnNumber: 12
        }, this);
        $[337] = t168;
        $[338] = t169;
    } else {
        t169 = $[338];
    }
    let t170;
    if ($[339] !== t) {
        t170 = t("\u0414\u0435\u043C\u043E \u0434\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438 ~ $8/\u043C\u0435\u0441/\u0433\u0430 \u0438 CAPEX ~ $90/\u0433\u0430", "Demo: ~ $8/oy/ga va CAPEX ~ $90/ga");
        $[339] = t;
        $[340] = t170;
    } else {
        t170 = $[340];
    }
    let t171;
    if ($[341] !== t170) {
        t171 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1 text-xs text-white/60",
            children: t170
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1596,
            columnNumber: 12
        }, this);
        $[341] = t170;
        $[342] = t171;
    } else {
        t171 = $[342];
    }
    let t172;
    let t173;
    if ($[343] === Symbol.for("react.memo_cache_sentinel")) {
        t172 = {
            top: 10,
            right: 10,
            left: -10,
            bottom: 0
        };
        t173 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
            strokeDasharray: "4 4",
            opacity: 0.15
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1611,
            columnNumber: 12
        }, this);
        $[343] = t172;
        $[344] = t173;
    } else {
        t172 = $[343];
        t173 = $[344];
    }
    let t174;
    if ($[345] === Symbol.for("react.memo_cache_sentinel")) {
        t174 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "month",
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1620,
            columnNumber: 12
        }, this);
        $[345] = t174;
    } else {
        t174 = $[345];
    }
    let t175;
    if ($[346] === Symbol.for("react.memo_cache_sentinel")) {
        t175 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
            tick: {
                fill: "rgba(255,255,255,0.65)",
                fontSize: 12
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1630,
            columnNumber: 12
        }, this);
        $[346] = t175;
    } else {
        t175 = $[346];
    }
    let t176;
    if ($[347] !== t) {
        t176 = ({
            "Page[<Tooltip>.formatter]": (v, name)=>[
                    `$${fmt.format(Number(v))}`,
                    name === "revenue" ? t("\u0412\u044B\u0440\u0443\u0447\u043A\u0430 (\u043D\u0430\u043A\u043E\u043F.)", "Tushum (jam)") : t("CAPEX", "CAPEX")
                ]
        })["Page[<Tooltip>.formatter]"];
        $[347] = t;
        $[348] = t176;
    } else {
        t176 = $[348];
    }
    let t177;
    if ($[349] === Symbol.for("react.memo_cache_sentinel")) {
        t177 = {
            background: "rgba(10,12,20,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            color: "white"
        };
        $[349] = t177;
    } else {
        t177 = $[349];
    }
    let t178;
    if ($[350] !== t176) {
        t178 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
            formatter: t176,
            contentStyle: t177
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1662,
            columnNumber: 12
        }, this);
        $[350] = t176;
        $[351] = t178;
    } else {
        t178 = $[351];
    }
    let t179;
    if ($[352] === Symbol.for("react.memo_cache_sentinel")) {
        t179 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
            wrapperStyle: {
                color: "rgba(255,255,255,0.7)"
            }
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1670,
            columnNumber: 12
        }, this);
        $[352] = t179;
    } else {
        t179 = $[352];
    }
    let t180;
    if ($[353] !== t) {
        t180 = t("\u0412\u044B\u0440\u0443\u0447\u043A\u0430 (\u043D\u0430\u043A\u043E\u043F.)", "Tushum (jam)");
        $[353] = t;
        $[354] = t180;
    } else {
        t180 = $[354];
    }
    let t181;
    if ($[355] !== t180) {
        t181 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            dataKey: "revenue",
            name: t180,
            stroke: "#22d3ee",
            fill: "#22d3ee",
            fillOpacity: 0.15,
            strokeWidth: 2
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1687,
            columnNumber: 12
        }, this);
        $[355] = t180;
        $[356] = t181;
    } else {
        t181 = $[356];
    }
    let t182;
    if ($[357] !== t) {
        t182 = t("CAPEX", "CAPEX");
        $[357] = t;
        $[358] = t182;
    } else {
        t182 = $[358];
    }
    let t183;
    if ($[359] !== t182) {
        t183 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
            dataKey: "cost",
            name: t182,
            stroke: "#f87171",
            fill: "#f87171",
            fillOpacity: 0.08,
            strokeWidth: 2,
            strokeDasharray: "5 5"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1703,
            columnNumber: 12
        }, this);
        $[359] = t182;
        $[360] = t183;
    } else {
        t183 = $[360];
    }
    let t184;
    if ($[361] !== t178 || $[362] !== t181 || $[363] !== t183) {
        t184 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 h-72",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                    data: payback,
                    margin: t172,
                    children: [
                        t173,
                        t174,
                        t175,
                        t178,
                        t179,
                        t181,
                        t183
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1711,
                    columnNumber: 60
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1711,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1711,
            columnNumber: 12
        }, this);
        $[361] = t178;
        $[362] = t181;
        $[363] = t183;
        $[364] = t184;
    } else {
        t184 = $[364];
    }
    let t185;
    if ($[365] !== t) {
        t185 = t("\u0426\u0435\u043B\u044C \u043F\u0438\u043B\u043E\u0442\u0430 \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044E \u0438 \u0441\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0440\u043E\u043A \u043E\u043A\u0443\u043F\u0430\u0435\u043C\u043E\u0441\u0442\u0438 \u0437\u0430 \u0441\u0447\u0451\u0442 \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u0438 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F.", "Pilot maqsadi \u2014 tejalishni isbotlash va servis modeli hamda masshtablash orqali qaytishni tezlatish.");
        $[365] = t;
        $[366] = t185;
    } else {
        t185 = $[366];
    }
    let t186;
    if ($[367] !== t185) {
        t186 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-6 text-sm text-white/70",
            children: t185
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1729,
            columnNumber: 12
        }, this);
        $[367] = t185;
        $[368] = t186;
    } else {
        t186 = $[368];
    }
    let t187;
    if ($[369] !== t169 || $[370] !== t171 || $[371] !== t184 || $[372] !== t186) {
        t187 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t169,
                t171,
                t184,
                t186
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1737,
            columnNumber: 12
        }, this);
        $[369] = t169;
        $[370] = t171;
        $[371] = t184;
        $[372] = t186;
        $[373] = t187;
    } else {
        t187 = $[373];
    }
    let t188;
    if ($[374] !== t167 || $[375] !== t187) {
        t188 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 grid grid-cols-1 gap-4 md:grid-cols-2",
            children: [
                t167,
                t187
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1748,
            columnNumber: 12
        }, this);
        $[374] = t167;
        $[375] = t187;
        $[376] = t188;
    } else {
        t188 = $[376];
    }
    let t189;
    if ($[377] !== t146 || $[378] !== t188) {
        t189 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "demo",
            className: "relative border-t border-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-4 py-14",
                children: [
                    t146,
                    t188
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 1757,
                columnNumber: 77
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1757,
            columnNumber: 12
        }, this);
        $[377] = t146;
        $[378] = t188;
        $[379] = t189;
    } else {
        t189 = $[379];
    }
    let t190;
    if ($[380] !== t) {
        t190 = t("\u041E\u0444\u0444\u0435\u0440 \u0434\u043B\u044F \u043F\u0438\u043B\u043E\u0442\u0430", "Pilot uchun taklif");
        $[380] = t;
        $[381] = t190;
    } else {
        t190 = $[381];
    }
    let t191;
    if ($[382] !== t190) {
        t191 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-semibold",
            children: t190
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1774,
            columnNumber: 12
        }, this);
        $[382] = t190;
        $[383] = t191;
    } else {
        t191 = $[383];
    }
    let t192;
    if ($[384] !== t) {
        t192 = t("\u0421\u0442\u0430\u0432\u0438\u043C \u043D\u0430 1\u20132 \u0433\u0430, \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0446\u0438\u0444\u0440\u044B. \u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u044B \u043D\u0435\u0442 \u2014 \u0437\u0430\u0431\u0438\u0440\u0430\u0435\u043C. \u0415\u0441\u043B\u0438 \u0435\u0441\u0442\u044C \u2014 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u0443\u0435\u043C.", "1\u20132 gektarga o\u2018rnatamiz, raqamlarni ko\u2018rsatamiz. Foyda bo\u2018lmasa \u2014 olib ketamiz. Bo\u2018lsa \u2014 kengaytiramiz.");
        $[384] = t;
        $[385] = t192;
    } else {
        t192 = $[385];
    }
    let t193;
    if ($[386] !== t192) {
        t193 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 max-w-2xl text-sm text-white/70",
            children: t192
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1790,
            columnNumber: 12
        }, this);
        $[386] = t192;
        $[387] = t193;
    } else {
        t193 = $[387];
    }
    let t194;
    if ($[388] !== t) {
        t194 = t("\u0421\u0442\u0430\u0440\u0442", "Start");
        $[388] = t;
        $[389] = t194;
    } else {
        t194 = $[389];
    }
    let t195;
    if ($[390] !== t194) {
        t195 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t194
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1806,
            columnNumber: 12
        }, this);
        $[390] = t194;
        $[391] = t195;
    } else {
        t195 = $[391];
    }
    let t196;
    if ($[392] !== t) {
        t196 = t("\u041F\u0438\u043B\u043E\u0442", "Pilot");
        $[392] = t;
        $[393] = t196;
    } else {
        t196 = $[393];
    }
    let t197;
    if ($[394] !== t196) {
        t197 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 text-3xl font-semibold",
            children: t196
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1822,
            columnNumber: 12
        }, this);
        $[394] = t196;
        $[395] = t197;
    } else {
        t197 = $[395];
    }
    let t198;
    if ($[396] === Symbol.for("react.memo_cache_sentinel")) {
        t198 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1830,
            columnNumber: 12
        }, this);
        $[396] = t198;
    } else {
        t198 = $[396];
    }
    let t199;
    if ($[397] !== t) {
        t199 = t("\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 1\u20132 \u0433\u0430", "1\u20132 ga o\u2018rnatish");
        $[397] = t;
        $[398] = t199;
    } else {
        t199 = $[398];
    }
    let t200;
    if ($[399] !== t199) {
        t200 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t198,
                " ",
                t199
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1845,
            columnNumber: 12
        }, this);
        $[399] = t199;
        $[400] = t200;
    } else {
        t200 = $[400];
    }
    let t201;
    if ($[401] === Symbol.for("react.memo_cache_sentinel")) {
        t201 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1853,
            columnNumber: 12
        }, this);
        $[401] = t201;
    } else {
        t201 = $[401];
    }
    let t202;
    if ($[402] !== t) {
        t202 = t("Telegram-\u0431\u043E\u0442", "Telegram-bot");
        $[402] = t;
        $[403] = t202;
    } else {
        t202 = $[403];
    }
    let t203;
    if ($[404] !== t202) {
        t203 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t201,
                " ",
                t202
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1868,
            columnNumber: 12
        }, this);
        $[404] = t202;
        $[405] = t203;
    } else {
        t203 = $[405];
    }
    let t204;
    if ($[406] === Symbol.for("react.memo_cache_sentinel")) {
        t204 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1876,
            columnNumber: 12
        }, this);
        $[406] = t204;
    } else {
        t204 = $[406];
    }
    let t205;
    if ($[407] !== t) {
        t205 = t("\u041E\u0442\u0447\u0451\u0442 \u201C\u0434\u043E/\u043F\u043E\u0441\u043B\u0435\u201D", "\u201COldin/keyin\u201D hisobot");
        $[407] = t;
        $[408] = t205;
    } else {
        t205 = $[408];
    }
    let t206;
    if ($[409] !== t205) {
        t206 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t204,
                " ",
                t205
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1891,
            columnNumber: 12
        }, this);
        $[409] = t205;
        $[410] = t206;
    } else {
        t206 = $[410];
    }
    let t207;
    if ($[411] !== t200 || $[412] !== t203 || $[413] !== t206) {
        t207 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-4 space-y-2 text-sm text-white/70",
            children: [
                t200,
                t203,
                t206
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1899,
            columnNumber: 12
        }, this);
        $[411] = t200;
        $[412] = t203;
        $[413] = t206;
        $[414] = t207;
    } else {
        t207 = $[414];
    }
    let t208;
    if ($[415] !== t195 || $[416] !== t197 || $[417] !== t207) {
        t208 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t195,
                t197,
                t207
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1909,
            columnNumber: 12
        }, this);
        $[415] = t195;
        $[416] = t197;
        $[417] = t207;
        $[418] = t208;
    } else {
        t208 = $[418];
    }
    let t209;
    if ($[419] !== t) {
        t209 = t("\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430", "Obuna");
        $[419] = t;
        $[420] = t209;
    } else {
        t209 = $[420];
    }
    let t210;
    if ($[421] !== t209) {
        t210 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t209
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1927,
            columnNumber: 12
        }, this);
        $[421] = t209;
        $[422] = t210;
    } else {
        t210 = $[422];
    }
    let t211;
    if ($[423] !== t) {
        t211 = t("\u0441\u0443\u043C/\u0433\u0430/\u043C\u0435\u0441", "so\u2018m/ga/oy");
        $[423] = t;
        $[424] = t211;
    } else {
        t211 = $[424];
    }
    let t212;
    if ($[425] !== t211) {
        t212 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 text-3xl font-semibold",
            children: [
                "100 000 ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-base font-semibold text-white/60",
                    children: t211
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 1943,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1943,
            columnNumber: 12
        }, this);
        $[425] = t211;
        $[426] = t212;
    } else {
        t212 = $[426];
    }
    let t213;
    if ($[427] === Symbol.for("react.memo_cache_sentinel")) {
        t213 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1951,
            columnNumber: 12
        }, this);
        $[427] = t213;
    } else {
        t213 = $[427];
    }
    let t214;
    if ($[428] !== t) {
        t214 = t("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u0433\u0440\u0430\u0444\u0438\u043A\u0438", "Ogohlantirishlar va grafiklar");
        $[428] = t;
        $[429] = t214;
    } else {
        t214 = $[429];
    }
    let t215;
    if ($[430] !== t214) {
        t215 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t213,
                " ",
                t214
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1966,
            columnNumber: 12
        }, this);
        $[430] = t214;
        $[431] = t215;
    } else {
        t215 = $[431];
    }
    let t216;
    if ($[432] === Symbol.for("react.memo_cache_sentinel")) {
        t216 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1974,
            columnNumber: 12
        }, this);
        $[432] = t216;
    } else {
        t216 = $[432];
    }
    let t217;
    if ($[433] !== t) {
        t217 = t("\u041F\u043E\u0440\u043E\u0433\u043E\u0432\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430", "Chegaraviy qoidalar");
        $[433] = t;
        $[434] = t217;
    } else {
        t217 = $[434];
    }
    let t218;
    if ($[435] !== t217) {
        t218 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t216,
                " ",
                t217
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1989,
            columnNumber: 12
        }, this);
        $[435] = t217;
        $[436] = t218;
    } else {
        t218 = $[436];
    }
    let t219;
    if ($[437] === Symbol.for("react.memo_cache_sentinel")) {
        t219 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 1997,
            columnNumber: 12
        }, this);
        $[437] = t219;
    } else {
        t219 = $[437];
    }
    let t220;
    if ($[438] !== t) {
        t220 = t("\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430/\u0437\u0430\u043C\u0435\u043D\u0430", "Qo\u2018llab-quvvatlash/almashtirish");
        $[438] = t;
        $[439] = t220;
    } else {
        t220 = $[439];
    }
    let t221;
    if ($[440] !== t220) {
        t221 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t219,
                " ",
                t220
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2012,
            columnNumber: 12
        }, this);
        $[440] = t220;
        $[441] = t221;
    } else {
        t221 = $[441];
    }
    let t222;
    if ($[442] !== t215 || $[443] !== t218 || $[444] !== t221) {
        t222 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-4 space-y-2 text-sm text-white/70",
            children: [
                t215,
                t218,
                t221
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2020,
            columnNumber: 12
        }, this);
        $[442] = t215;
        $[443] = t218;
        $[444] = t221;
        $[445] = t222;
    } else {
        t222 = $[445];
    }
    let t223;
    if ($[446] !== t210 || $[447] !== t212 || $[448] !== t222) {
        t223 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t210,
                t212,
                t222
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2030,
            columnNumber: 12
        }, this);
        $[446] = t210;
        $[447] = t212;
        $[448] = t222;
        $[449] = t223;
    } else {
        t223 = $[449];
    }
    let t224;
    if ($[450] !== t) {
        t224 = t("\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F", "Integratsiya");
        $[450] = t;
        $[451] = t224;
    } else {
        t224 = $[451];
    }
    let t225;
    if ($[452] !== t224) {
        t225 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-sm font-semibold",
            children: t224
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2048,
            columnNumber: 12
        }, this);
        $[452] = t224;
        $[453] = t225;
    } else {
        t225 = $[453];
    }
    let t226;
    if ($[454] !== t) {
        t226 = t("LoRaWAN", "LoRaWAN");
        $[454] = t;
        $[455] = t226;
    } else {
        t226 = $[455];
    }
    let t227;
    if ($[456] !== t226) {
        t227 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 text-3xl font-semibold",
            children: t226
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2064,
            columnNumber: 12
        }, this);
        $[456] = t226;
        $[457] = t227;
    } else {
        t227 = $[457];
    }
    let t228;
    if ($[458] === Symbol.for("react.memo_cache_sentinel")) {
        t228 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2072,
            columnNumber: 12
        }, this);
        $[458] = t228;
    } else {
        t228 = $[458];
    }
    let t229;
    if ($[459] !== t) {
        t229 = t("\u0420\u0430\u0431\u043E\u0442\u0430 \u0431\u0435\u0437 3G/4G", "3G/4G siz ishlaydi");
        $[459] = t;
        $[460] = t229;
    } else {
        t229 = $[460];
    }
    let t230;
    if ($[461] !== t229) {
        t230 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t228,
                " ",
                t229
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2087,
            columnNumber: 12
        }, this);
        $[461] = t229;
        $[462] = t230;
    } else {
        t230 = $[462];
    }
    let t231;
    if ($[463] === Symbol.for("react.memo_cache_sentinel")) {
        t231 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2095,
            columnNumber: 12
        }, this);
        $[463] = t231;
    } else {
        t231 = $[463];
    }
    let t232;
    if ($[464] !== t) {
        t232 = t("\u0428\u043B\u044E\u0437 \u043D\u0430 \u0445\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E", "Xo\u2018jalikka shlyuz");
        $[464] = t;
        $[465] = t232;
    } else {
        t232 = $[465];
    }
    let t233;
    if ($[466] !== t232) {
        t233 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t231,
                " ",
                t232
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2110,
            columnNumber: 12
        }, this);
        $[466] = t232;
        $[467] = t233;
    } else {
        t233 = $[467];
    }
    let t234;
    if ($[468] === Symbol.for("react.memo_cache_sentinel")) {
        t234 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2118,
            columnNumber: 12
        }, this);
        $[468] = t234;
    } else {
        t234 = $[468];
    }
    let t235;
    if ($[469] !== t) {
        t235 = t("\u0413\u043E\u0442\u043E\u0432\u043E \u043A \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044E", "Masshtabga tayyor");
        $[469] = t;
        $[470] = t235;
    } else {
        t235 = $[470];
    }
    let t236;
    if ($[471] !== t235) {
        t236 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t234,
                " ",
                t235
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2133,
            columnNumber: 12
        }, this);
        $[471] = t235;
        $[472] = t236;
    } else {
        t236 = $[472];
    }
    let t237;
    if ($[473] !== t230 || $[474] !== t233 || $[475] !== t236) {
        t237 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-4 space-y-2 text-sm text-white/70",
            children: [
                t230,
                t233,
                t236
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2141,
            columnNumber: 12
        }, this);
        $[473] = t230;
        $[474] = t233;
        $[475] = t236;
        $[476] = t237;
    } else {
        t237 = $[476];
    }
    let t238;
    if ($[477] !== t225 || $[478] !== t227 || $[479] !== t237) {
        t238 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t225,
                t227,
                t237
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2151,
            columnNumber: 12
        }, this);
        $[477] = t225;
        $[478] = t227;
        $[479] = t237;
        $[480] = t238;
    } else {
        t238 = $[480];
    }
    let t239;
    if ($[481] !== t208 || $[482] !== t223 || $[483] !== t238) {
        t239 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 grid grid-cols-1 gap-4 md:grid-cols-3",
            children: [
                t208,
                t223,
                t238
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2161,
            columnNumber: 12
        }, this);
        $[481] = t208;
        $[482] = t223;
        $[483] = t238;
        $[484] = t239;
    } else {
        t239 = $[484];
    }
    let t240;
    if ($[485] !== t191 || $[486] !== t193 || $[487] !== t239) {
        t240 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative border-t border-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-4 py-14",
                children: [
                    t191,
                    t193,
                    t239
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 2171,
                columnNumber: 67
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2171,
            columnNumber: 12
        }, this);
        $[485] = t191;
        $[486] = t193;
        $[487] = t239;
        $[488] = t240;
    } else {
        t240 = $[488];
    }
    let t241;
    if ($[489] !== t) {
        t241 = t("\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0438\u043B\u043E\u0442", "Pilot so\u2018rash");
        $[489] = t;
        $[490] = t241;
    } else {
        t241 = $[490];
    }
    let t242;
    if ($[491] !== t241) {
        t242 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-xl font-semibold",
            children: t241
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2189,
            columnNumber: 12
        }, this);
        $[491] = t241;
        $[492] = t242;
    } else {
        t242 = $[492];
    }
    let t243;
    if ($[493] !== t) {
        t243 = t("\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u2014 \u043C\u044B \u0432\u0435\u0440\u043D\u0435\u043C\u0441\u044F \u0441 \u043F\u043B\u0430\u043D\u043E\u043C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438 \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043E\u0442\u0447\u0435\u0442\u0430.", "Kontakt qoldiring \u2014 o\u2018rnatish reja va hisobot uchun ma\u2019lumotlar ro\u2018yxati bilan qaytamiz.");
        $[493] = t;
        $[494] = t243;
    } else {
        t243 = $[494];
    }
    let t244;
    if ($[495] !== t243) {
        t244 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 text-sm text-white/70",
            children: t243
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2205,
            columnNumber: 12
        }, this);
        $[495] = t243;
        $[496] = t244;
    } else {
        t244 = $[496];
    }
    let t245;
    if ($[497] !== t) {
        t245 = ({
            "Page[<form>.onSubmit]": (e)=>{
                e.preventDefault();
                alert(t("\u0414\u0435\u043C\u043E: \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 Formspree/Resend.", "Demo: Formspree/Resend orqali yuborishni ulang."));
            }
        })["Page[<form>.onSubmit]"];
        $[497] = t;
        $[498] = t245;
    } else {
        t245 = $[498];
    }
    let t246;
    if ($[499] !== t) {
        t246 = t("\u0418\u043C\u044F / \u0425\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E", "Ism / Xo\u2018jalik");
        $[499] = t;
        $[500] = t246;
    } else {
        t246 = $[500];
    }
    let t247;
    if ($[501] !== t246) {
        t247 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25",
            placeholder: t246
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2234,
            columnNumber: 12
        }, this);
        $[501] = t246;
        $[502] = t247;
    } else {
        t247 = $[502];
    }
    let t248;
    if ($[503] !== t) {
        t248 = t("\u0422\u0435\u043B\u0435\u0444\u043E\u043D / Telegram", "Telefon / Telegram");
        $[503] = t;
        $[504] = t248;
    } else {
        t248 = $[504];
    }
    let t249;
    if ($[505] !== t248) {
        t249 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25",
            placeholder: t248
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2250,
            columnNumber: 12
        }, this);
        $[505] = t248;
        $[506] = t249;
    } else {
        t249 = $[506];
    }
    let t250;
    if ($[507] !== t) {
        t250 = t("\u0420\u0435\u0433\u0438\u043E\u043D (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0421\u044B\u0440\u0434\u0430\u0440\u044C\u044F)", "Hudud (masalan: Sirdaryo)");
        $[507] = t;
        $[508] = t250;
    } else {
        t250 = $[508];
    }
    let t251;
    if ($[509] !== t250) {
        t251 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-white/25",
            placeholder: t250
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2266,
            columnNumber: 12
        }, this);
        $[509] = t250;
        $[510] = t251;
    } else {
        t251 = $[510];
    }
    let t252;
    if ($[511] !== t) {
        t252 = t("\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "Yuborish");
        $[511] = t;
        $[512] = t252;
    } else {
        t252 = $[512];
    }
    let t253;
    if ($[513] === Symbol.for("react.memo_cache_sentinel")) {
        t253 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2282,
            columnNumber: 12
        }, this);
        $[513] = t253;
    } else {
        t253 = $[513];
    }
    let t254;
    if ($[514] !== t252) {
        t254 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#070A12] hover:bg-white/90",
            children: [
                t252,
                t253
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2289,
            columnNumber: 12
        }, this);
        $[514] = t252;
        $[515] = t254;
    } else {
        t254 = $[515];
    }
    let t255;
    if ($[516] !== t245 || $[517] !== t247 || $[518] !== t249 || $[519] !== t251 || $[520] !== t254) {
        t255 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "mt-6 space-y-3",
            onSubmit: t245,
            children: [
                t247,
                t249,
                t251,
                t254
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2297,
            columnNumber: 12
        }, this);
        $[516] = t245;
        $[517] = t247;
        $[518] = t249;
        $[519] = t251;
        $[520] = t254;
        $[521] = t255;
    } else {
        t255 = $[521];
    }
    let t256;
    if ($[522] !== t) {
        t256 = t("\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u044B: Formspree, Resend \u0438\u043B\u0438 API route \u0432 Next.js.", "Forma ulash: Formspree, Resend yoki Next.js API route.");
        $[522] = t;
        $[523] = t256;
    } else {
        t256 = $[523];
    }
    let t257;
    if ($[524] !== t256) {
        t257 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 text-xs text-white/50",
            children: t256
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2317,
            columnNumber: 12
        }, this);
        $[524] = t256;
        $[525] = t257;
    } else {
        t257 = $[525];
    }
    let t258;
    if ($[526] !== t242 || $[527] !== t244 || $[528] !== t255 || $[529] !== t257) {
        t258 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t242,
                t244,
                t255,
                t257
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2325,
            columnNumber: 12
        }, this);
        $[526] = t242;
        $[527] = t244;
        $[528] = t255;
        $[529] = t257;
        $[530] = t258;
    } else {
        t258 = $[530];
    }
    let t259;
    if ($[531] !== t) {
        t259 = t("\u0427\u0442\u043E \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0432\u0435\u0441\u0442\u043E\u0440\u0443/\u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0443", "Investor/hamkorga nima ko\u2018rsatish");
        $[531] = t;
        $[532] = t259;
    } else {
        t259 = $[532];
    }
    let t260;
    if ($[533] !== t259) {
        t260 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-xl font-semibold",
            children: t259
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2344,
            columnNumber: 12
        }, this);
        $[533] = t259;
        $[534] = t260;
    } else {
        t260 = $[534];
    }
    let t261;
    if ($[535] === Symbol.for("react.memo_cache_sentinel")) {
        t261 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "mt-0.5 h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2352,
            columnNumber: 12
        }, this);
        $[535] = t261;
    } else {
        t261 = $[535];
    }
    let t262;
    if ($[536] !== t) {
        t262 = t("\u0413\u0440\u0430\u0444\u0438\u043A\u0438 \u0432\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u0438 (20/40 \u0441\u043C) \u0438 \u043F\u043E\u0440\u043E\u0433.", "Namlik grafiklari (20/40 sm) va chegara.");
        $[536] = t;
        $[537] = t262;
    } else {
        t262 = $[537];
    }
    let t263;
    if ($[538] !== t262) {
        t263 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t261,
                t262
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2367,
            columnNumber: 12
        }, this);
        $[538] = t262;
        $[539] = t263;
    } else {
        t263 = $[539];
    }
    let t264;
    if ($[540] === Symbol.for("react.memo_cache_sentinel")) {
        t264 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "mt-0.5 h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2375,
            columnNumber: 12
        }, this);
        $[540] = t264;
    } else {
        t264 = $[540];
    }
    let t265;
    if ($[541] !== t) {
        t265 = t("\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u201C\u0434\u043E/\u043F\u043E\u0441\u043B\u0435\u201D: \u0432\u043E\u0434\u0430 \u0438 \u0447\u0430\u0441\u044B \u043D\u0430\u0441\u043E\u0441\u0430.", "\u201COldin/keyin\u201D: suv va nasos soatlari.");
        $[541] = t;
        $[542] = t265;
    } else {
        t265 = $[542];
    }
    let t266;
    if ($[543] !== t265) {
        t266 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t264,
                t265
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2390,
            columnNumber: 12
        }, this);
        $[543] = t265;
        $[544] = t266;
    } else {
        t266 = $[544];
    }
    let t267;
    if ($[545] === Symbol.for("react.memo_cache_sentinel")) {
        t267 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "mt-0.5 h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2398,
            columnNumber: 12
        }, this);
        $[545] = t267;
    } else {
        t267 = $[545];
    }
    let t268;
    if ($[546] !== t) {
        t268 = t("\u041E\u043A\u0443\u043F\u0430\u0435\u043C\u043E\u0441\u0442\u044C: \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 vs CAPEX \u0438 SLA \u043D\u0430 \u0437\u0430\u043C\u0435\u043D\u0443.", "Qaytish: obuna vs CAPEX va SLA.");
        $[546] = t;
        $[547] = t268;
    } else {
        t268 = $[547];
    }
    let t269;
    if ($[548] !== t268) {
        t269 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t267,
                t268
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2413,
            columnNumber: 12
        }, this);
        $[548] = t268;
        $[549] = t269;
    } else {
        t269 = $[549];
    }
    let t270;
    if ($[550] === Symbol.for("react.memo_cache_sentinel")) {
        t270 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "mt-0.5 h-4 w-4 text-emerald-300"
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2421,
            columnNumber: 12
        }, this);
        $[550] = t270;
    } else {
        t270 = $[550];
    }
    let t271;
    if ($[551] !== t) {
        t271 = t("\u0424\u043E\u0442\u043E/\u0432\u0438\u0434\u0435\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438 \u043E\u0442\u0447\u0435\u0442 \u043D\u0430 1 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.", "O\u2018rnatish foto/video va 1 bet hisobot.");
        $[551] = t;
        $[552] = t271;
    } else {
        t271 = $[552];
    }
    let t272;
    if ($[553] !== t271) {
        t272 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex gap-2",
            children: [
                t270,
                t271
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2436,
            columnNumber: 12
        }, this);
        $[553] = t271;
        $[554] = t272;
    } else {
        t272 = $[554];
    }
    let t273;
    if ($[555] !== t263 || $[556] !== t266 || $[557] !== t269 || $[558] !== t272) {
        t273 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "mt-4 space-y-3 text-sm text-white/70",
            children: [
                t263,
                t266,
                t269,
                t272
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2444,
            columnNumber: 12
        }, this);
        $[555] = t263;
        $[556] = t266;
        $[557] = t269;
        $[558] = t272;
        $[559] = t273;
    } else {
        t273 = $[559];
    }
    let t274;
    if ($[560] !== t) {
        t274 = t("\u0421\u043B\u043E\u0433\u0430\u043D", "Slogan");
        $[560] = t;
        $[561] = t274;
    } else {
        t274 = $[561];
    }
    let t275;
    if ($[562] !== t274) {
        t275 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-white/60",
            children: t274
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2463,
            columnNumber: 12
        }, this);
        $[562] = t274;
        $[563] = t275;
    } else {
        t275 = $[563];
    }
    let t276;
    if ($[564] !== t) {
        t276 = t("\u201C\u0412\u043E\u0434\u0430 \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u0437\u043E\u043B\u043E\u0442\u043E\u0439. \u041C\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u043F\u043E\u043B\u0438\u0432\u0430\u0442\u044C \u0442\u043E\u0447\u043D\u043E.\u201D", "\u201CSuv oltindek qimmat. Biz aniq sug\u2018orishga yordam beramiz.\u201D");
        $[564] = t;
        $[565] = t276;
    } else {
        t276 = $[565];
    }
    let t277;
    if ($[566] !== t276) {
        t277 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 text-lg font-semibold",
            children: t276
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2479,
            columnNumber: 12
        }, this);
        $[566] = t276;
        $[567] = t277;
    } else {
        t277 = $[567];
    }
    let t278;
    if ($[568] !== t275 || $[569] !== t277) {
        t278 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-5",
            children: [
                t275,
                t277
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2487,
            columnNumber: 12
        }, this);
        $[568] = t275;
        $[569] = t277;
        $[570] = t278;
    } else {
        t278 = $[570];
    }
    let t279;
    if ($[571] !== t260 || $[572] !== t273 || $[573] !== t278) {
        t279 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            children: [
                t260,
                t273,
                t278
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2496,
            columnNumber: 12
        }, this);
        $[571] = t260;
        $[572] = t273;
        $[573] = t278;
        $[574] = t279;
    } else {
        t279 = $[574];
    }
    let t280;
    if ($[575] !== t258 || $[576] !== t279) {
        t280 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-6 md:grid-cols-2",
            children: [
                t258,
                t279
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2506,
            columnNumber: 12
        }, this);
        $[575] = t258;
        $[576] = t279;
        $[577] = t280;
    } else {
        t280 = $[577];
    }
    let t281;
    if ($[578] !== t) {
        t281 = t("\xA9 Aqlli Dala \u2014 demo landing (Vercel-ready)", "\xA9 Aqlli Dala \u2014 demo landing (Vercel-ready)");
        $[578] = t;
        $[579] = t281;
    } else {
        t281 = $[579];
    }
    let t282;
    if ($[580] !== t281) {
        t282 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "mt-10 border-t border-white/10 pt-6 text-xs text-white/50",
            children: t281
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2523,
            columnNumber: 12
        }, this);
        $[580] = t281;
        $[581] = t282;
    } else {
        t282 = $[581];
    }
    let t283;
    if ($[582] !== t280 || $[583] !== t282) {
        t283 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            id: "contact",
            className: "relative border-t border-white/10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-6xl px-4 py-14",
                children: [
                    t280,
                    t282
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 2531,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2531,
            columnNumber: 12
        }, this);
        $[582] = t280;
        $[583] = t282;
        $[584] = t283;
    } else {
        t283 = $[584];
    }
    let t284;
    if ($[585] !== t104 || $[586] !== t137 || $[587] !== t189 || $[588] !== t240 || $[589] !== t27 || $[590] !== t283) {
        t284 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#070A12] text-white",
            children: [
                t6,
                t27,
                t104,
                t137,
                t189,
                t240,
                t283
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 2540,
            columnNumber: 12
        }, this);
        $[585] = t104;
        $[586] = t137;
        $[587] = t189;
        $[588] = t240;
        $[589] = t27;
        $[590] = t283;
        $[591] = t284;
    } else {
        t284 = $[591];
    }
    return t284;
}
_s(Page, "hgdg/fHOB2ySftZsEGD2cYiDoZY=");
_c2 = Page;
function _PageWaterBeforeAfterReduce2(s_0, x_0) {
    return s_0 + x_0.after;
}
function _PageWaterBeforeAfterReduce(s, x) {
    return s + x.before;
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_page_tsx_b4090435._.js.map