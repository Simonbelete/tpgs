if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>i(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(a(...e),n)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1031-4d6e3d687e90dbdf.js",revision:"4d6e3d687e90dbdf"},{url:"/_next/static/chunks/1169.3aa57acb9fa1b82c.js",revision:"3aa57acb9fa1b82c"},{url:"/_next/static/chunks/1281-20b31a66edb1c3a1.js",revision:"20b31a66edb1c3a1"},{url:"/_next/static/chunks/1519-6da20fbe0e25221e.js",revision:"6da20fbe0e25221e"},{url:"/_next/static/chunks/156.1ff7a5d7d4194313.js",revision:"1ff7a5d7d4194313"},{url:"/_next/static/chunks/1606726a.9ce35e147cc2feb8.js",revision:"9ce35e147cc2feb8"},{url:"/_next/static/chunks/1657-c8ebae66adcf84f2.js",revision:"c8ebae66adcf84f2"},{url:"/_next/static/chunks/1659-30f39cc4011a9613.js",revision:"30f39cc4011a9613"},{url:"/_next/static/chunks/1680.1b7d527019a369e1.js",revision:"1b7d527019a369e1"},{url:"/_next/static/chunks/1794-3c7c01764240915b.js",revision:"3c7c01764240915b"},{url:"/_next/static/chunks/1b8dab7b-aae19a2ae206e5b9.js",revision:"aae19a2ae206e5b9"},{url:"/_next/static/chunks/228771e0-e56e969aa1af9254.js",revision:"e56e969aa1af9254"},{url:"/_next/static/chunks/2310.0ae6e91cd31d1000.js",revision:"0ae6e91cd31d1000"},{url:"/_next/static/chunks/2405-71dda7cf3fbfeb7d.js",revision:"71dda7cf3fbfeb7d"},{url:"/_next/static/chunks/2425-08fc0b8689ae21cd.js",revision:"08fc0b8689ae21cd"},{url:"/_next/static/chunks/258-6e0ffd99070788be.js",revision:"6e0ffd99070788be"},{url:"/_next/static/chunks/2604.2f72a939c01005e2.js",revision:"2f72a939c01005e2"},{url:"/_next/static/chunks/301-1087f291c882e10a.js",revision:"1087f291c882e10a"},{url:"/_next/static/chunks/3612-3d6af3a895706650.js",revision:"3d6af3a895706650"},{url:"/_next/static/chunks/3686-3e7ea6310707e0fc.js",revision:"3e7ea6310707e0fc"},{url:"/_next/static/chunks/4091-beac053efb34a759.js",revision:"beac053efb34a759"},{url:"/_next/static/chunks/410.9616b93c629193aa.js",revision:"9616b93c629193aa"},{url:"/_next/static/chunks/4447.6be84c552e81bf4b.js",revision:"6be84c552e81bf4b"},{url:"/_next/static/chunks/4569-fdd5f072748920e7.js",revision:"fdd5f072748920e7"},{url:"/_next/static/chunks/4581-64d9a8025ee862a0.js",revision:"64d9a8025ee862a0"},{url:"/_next/static/chunks/5255.ee04e5711779b3a2.js",revision:"ee04e5711779b3a2"},{url:"/_next/static/chunks/527dfe43-0631f3c87ccef138.js",revision:"0631f3c87ccef138"},{url:"/_next/static/chunks/5479-f7cb1ed702176b4d.js",revision:"f7cb1ed702176b4d"},{url:"/_next/static/chunks/5530.9374617d462e3d84.js",revision:"9374617d462e3d84"},{url:"/_next/static/chunks/5863-87b08da6f1788375.js",revision:"87b08da6f1788375"},{url:"/_next/static/chunks/5917-81d736e09c9484e3.js",revision:"81d736e09c9484e3"},{url:"/_next/static/chunks/5918-ae7fc2fd920408b8.js",revision:"ae7fc2fd920408b8"},{url:"/_next/static/chunks/6058.0a0cae2beda69425.js",revision:"0a0cae2beda69425"},{url:"/_next/static/chunks/622efa3d-ca18b0227bcebc12.js",revision:"ca18b0227bcebc12"},{url:"/_next/static/chunks/6479-fb5a9cfca8716b99.js",revision:"fb5a9cfca8716b99"},{url:"/_next/static/chunks/65291039-68179a800cfeceef.js",revision:"68179a800cfeceef"},{url:"/_next/static/chunks/6590-423b5d4e9176c22f.js",revision:"423b5d4e9176c22f"},{url:"/_next/static/chunks/6741-de2f49f9196bfe71.js",revision:"de2f49f9196bfe71"},{url:"/_next/static/chunks/6878-166d3f15881740e8.js",revision:"166d3f15881740e8"},{url:"/_next/static/chunks/7301-253793be8ea7d1d9.js",revision:"253793be8ea7d1d9"},{url:"/_next/static/chunks/7358-8fa82c64bef3245e.js",revision:"8fa82c64bef3245e"},{url:"/_next/static/chunks/7633-7b74183426b72671.js",revision:"7b74183426b72671"},{url:"/_next/static/chunks/7748-61e3489e4737b479.js",revision:"61e3489e4737b479"},{url:"/_next/static/chunks/789-f0a435a0198b4297.js",revision:"f0a435a0198b4297"},{url:"/_next/static/chunks/7915.db6da395a1dc6752.js",revision:"db6da395a1dc6752"},{url:"/_next/static/chunks/8416-0075d2d42dcdf0ba.js",revision:"0075d2d42dcdf0ba"},{url:"/_next/static/chunks/8504-21a9b8247c37b347.js",revision:"21a9b8247c37b347"},{url:"/_next/static/chunks/8660.4c8f11f0ebc9ec40.js",revision:"4c8f11f0ebc9ec40"},{url:"/_next/static/chunks/8690.87ace90de10ce30b.js",revision:"87ace90de10ce30b"},{url:"/_next/static/chunks/9465-8e4b1b9d3c4c836c.js",revision:"8e4b1b9d3c4c836c"},{url:"/_next/static/chunks/9541.234a164f052d8c84.js",revision:"234a164f052d8c84"},{url:"/_next/static/chunks/c9184924-15b2e493df81b29e.js",revision:"15b2e493df81b29e"},{url:"/_next/static/chunks/ccf7da5b.4f4f5b2fd619f121.js",revision:"4f4f5b2fd619f121"},{url:"/_next/static/chunks/de49cc29.75d2ddd45b2321f8.js",revision:"75d2ddd45b2321f8"},{url:"/_next/static/chunks/framework-56eb74ff06128874.js",revision:"56eb74ff06128874"},{url:"/_next/static/chunks/main-607ff5eb5a4ee57a.js",revision:"607ff5eb5a4ee57a"},{url:"/_next/static/chunks/pages/403-9bf610e3991e7f47.js",revision:"9bf610e3991e7f47"},{url:"/_next/static/chunks/pages/404-5de01e265ed3943b.js",revision:"5de01e265ed3943b"},{url:"/_next/static/chunks/pages/500-ed7eb0931105b3a7.js",revision:"ed7eb0931105b3a7"},{url:"/_next/static/chunks/pages/_error-eb74a452056fea13.js",revision:"eb74a452056fea13"},{url:"/_next/static/chunks/pages/activities-ce25442b824fe08b.js",revision:"ce25442b824fe08b"},{url:"/_next/static/chunks/pages/breeds-4c12b695a9c3e253.js",revision:"4c12b695a9c3e253"},{url:"/_next/static/chunks/pages/breeds/%5Bid%5D-2cba2a12cfe6f5f4.js",revision:"2cba2a12cfe6f5f4"},{url:"/_next/static/chunks/pages/breeds/%5Bid%5D/edit-8052c67fc38f9179.js",revision:"8052c67fc38f9179"},{url:"/_next/static/chunks/pages/breeds/%5Bid%5D/histories-4629d5af892feaed.js",revision:"4629d5af892feaed"},{url:"/_next/static/chunks/pages/breeds/create-c50a09164e286586.js",revision:"c50a09164e286586"},{url:"/_next/static/chunks/pages/candling-e63b58c2b4e21bb2.js",revision:"e63b58c2b4e21bb2"},{url:"/_next/static/chunks/pages/candling/%5Bid%5D-f41c6cc69da93e16.js",revision:"f41c6cc69da93e16"},{url:"/_next/static/chunks/pages/candling/%5Bid%5D/edit-d92140bf086fc78d.js",revision:"d92140bf086fc78d"},{url:"/_next/static/chunks/pages/candling/%5Bid%5D/histories-c2fe242e546f80b8.js",revision:"c2fe242e546f80b8"},{url:"/_next/static/chunks/pages/candling/create-9ecee9e4dbf7fb22.js",revision:"9ecee9e4dbf7fb22"},{url:"/_next/static/chunks/pages/chicken-grid-f4f95edeba6b09d1.js",revision:"f4f95edeba6b09d1"},{url:"/_next/static/chunks/pages/chickens-95eacf9841fc45d4.js",revision:"95eacf9841fc45d4"},{url:"/_next/static/chunks/pages/chickens-summary-421d070d3fd3ed5b.js",revision:"421d070d3fd3ed5b"},{url:"/_next/static/chunks/pages/chickens/%5Bid%5D-8a58a6ee942ebd65.js",revision:"8a58a6ee942ebd65"},{url:"/_next/static/chunks/pages/chickens/%5Bid%5D/edit-e0102d8689e871df.js",revision:"e0102d8689e871df"},{url:"/_next/static/chunks/pages/chickens/%5Bid%5D/histories-8d8b8074765aa1a5.js",revision:"8d8b8074765aa1a5"},{url:"/_next/static/chunks/pages/chickens/create-e8ade214b1371481.js",revision:"e8ade214b1371481"},{url:"/_next/static/chunks/pages/chickens/cull-e5233f6d2d65aec9.js",revision:"e5233f6d2d65aec9"},{url:"/_next/static/chunks/pages/chickens/export-b7b3063b62337679.js",revision:"b7b3063b62337679"},{url:"/_next/static/chunks/pages/cities-12ce800431e85b42.js",revision:"12ce800431e85b42"},{url:"/_next/static/chunks/pages/contact-us-2f8f3731dd8edcfc.js",revision:"2f8f3731dd8edcfc"},{url:"/_next/static/chunks/pages/contact-us/create-239d93a1d790fc0a.js",revision:"239d93a1d790fc0a"},{url:"/_next/static/chunks/pages/countries-e96394c7ff8794db.js",revision:"e96394c7ff8794db"},{url:"/_next/static/chunks/pages/currencies-995b3c42bf7992d2.js",revision:"995b3c42bf7992d2"},{url:"/_next/static/chunks/pages/dashboard-9b6197d993728056.js",revision:"9b6197d993728056"},{url:"/_next/static/chunks/pages/eggs-10771efe9e5e7520.js",revision:"10771efe9e5e7520"},{url:"/_next/static/chunks/pages/eggs/%5Bid%5D-2c0fd3ad610eff33.js",revision:"2c0fd3ad610eff33"},{url:"/_next/static/chunks/pages/eggs/%5Bid%5D/edit-4591f2ec26480a8e.js",revision:"4591f2ec26480a8e"},{url:"/_next/static/chunks/pages/eggs/%5Bid%5D/histories-9698970ab1e454e6.js",revision:"9698970ab1e454e6"},{url:"/_next/static/chunks/pages/eggs/create-786acc2bc778bdff.js",revision:"786acc2bc778bdff"},{url:"/_next/static/chunks/pages/export-job-14c8823336297532.js",revision:"14c8823336297532"},{url:"/_next/static/chunks/pages/export-job/create-fb4d120a95137ee6.js",revision:"fb4d120a95137ee6"},{url:"/_next/static/chunks/pages/farms-8823f3fa7146a04e.js",revision:"8823f3fa7146a04e"},{url:"/_next/static/chunks/pages/farms/%5Bid%5D-8e82ab58ad10032e.js",revision:"8e82ab58ad10032e"},{url:"/_next/static/chunks/pages/farms/%5Bid%5D/edit-61a9a7f1d4e5abee.js",revision:"61a9a7f1d4e5abee"},{url:"/_next/static/chunks/pages/feeds-c0f8032c942113d5.js",revision:"c0f8032c942113d5"},{url:"/_next/static/chunks/pages/feeds/%5Bid%5D-2f3c0bc0b0fa38fd.js",revision:"2f3c0bc0b0fa38fd"},{url:"/_next/static/chunks/pages/feeds/%5Bid%5D/edit-2545f392f4b94995.js",revision:"2545f392f4b94995"},{url:"/_next/static/chunks/pages/feeds/%5Bid%5D/histories-94b382bc3bc5e6be.js",revision:"94b382bc3bc5e6be"},{url:"/_next/static/chunks/pages/feeds/batch-029dc3ca9f77c750.js",revision:"029dc3ca9f77c750"},{url:"/_next/static/chunks/pages/feeds/batch/%5Bid%5D-a7d373390ae1fb3f.js",revision:"a7d373390ae1fb3f"},{url:"/_next/static/chunks/pages/feeds/batch/%5Bid%5D/edit-234cb29e8dd3dd11.js",revision:"234cb29e8dd3dd11"},{url:"/_next/static/chunks/pages/feeds/batch/create-859542bca10f5c2b.js",revision:"859542bca10f5c2b"},{url:"/_next/static/chunks/pages/feeds/create-538266d83ab48ebd.js",revision:"538266d83ab48ebd"},{url:"/_next/static/chunks/pages/flocks-8f13c7a712430a19.js",revision:"8f13c7a712430a19"},{url:"/_next/static/chunks/pages/flocks/%5Bid%5D-578c48f4b2416e11.js",revision:"578c48f4b2416e11"},{url:"/_next/static/chunks/pages/flocks/%5Bid%5D/edit-cd8a57b2ba57668d.js",revision:"cd8a57b2ba57668d"},{url:"/_next/static/chunks/pages/flocks/%5Bid%5D/histories-8b0a4ace7e1c6387.js",revision:"8b0a4ace7e1c6387"},{url:"/_next/static/chunks/pages/flocks/create-e4d2e805f9c775f7.js",revision:"e4d2e805f9c775f7"},{url:"/_next/static/chunks/pages/flocks/reductions-3e1360a51c120d39.js",revision:"3e1360a51c120d39"},{url:"/_next/static/chunks/pages/forgot-password-b292d572292b21b4.js",revision:"b292d572292b21b4"},{url:"/_next/static/chunks/pages/formulation/experimental-6da90b392bbf9f0e.js",revision:"6da90b392bbf9f0e"},{url:"/_next/static/chunks/pages/formulation/formulas-82909fa4e848c3c1.js",revision:"82909fa4e848c3c1"},{url:"/_next/static/chunks/pages/formulation/formulas/%5Bid%5D-05991cb55ef9c04a.js",revision:"05991cb55ef9c04a"},{url:"/_next/static/chunks/pages/formulation/formulas/%5Bid%5D/dashboard-341347579cb8773a.js",revision:"341347579cb8773a"},{url:"/_next/static/chunks/pages/formulation/formulas/%5Bid%5D/edit-a2e34ca9e2a5758e.js",revision:"a2e34ca9e2a5758e"},{url:"/_next/static/chunks/pages/formulation/formulas/%5Bid%5D/matrix-08005444fc91d630.js",revision:"08005444fc91d630"},{url:"/_next/static/chunks/pages/formulation/formulas/create-12ce2763f2f14537.js",revision:"12ce2763f2f14537"},{url:"/_next/static/chunks/pages/groups-8d28e0710300d949.js",revision:"8d28e0710300d949"},{url:"/_next/static/chunks/pages/guidelines/egg-3288a505d4d9ce2e.js",revision:"3288a505d4d9ce2e"},{url:"/_next/static/chunks/pages/guidelines/egg/%5Bid%5D-733cb238e00a67a4.js",revision:"733cb238e00a67a4"},{url:"/_next/static/chunks/pages/guidelines/egg/%5Bid%5D/edit-d4c8e6ff1d4b92f0.js",revision:"d4c8e6ff1d4b92f0"},{url:"/_next/static/chunks/pages/guidelines/egg/%5Bid%5D/histories-0c5cb4f8c9e9ec22.js",revision:"0c5cb4f8c9e9ec22"},{url:"/_next/static/chunks/pages/guidelines/egg/create-36c3d4c9c2f005b2.js",revision:"36c3d4c9c2f005b2"},{url:"/_next/static/chunks/pages/guidelines/feed-fe859646a1096128.js",revision:"fe859646a1096128"},{url:"/_next/static/chunks/pages/guidelines/feed/%5Bid%5D-69ebcc4bc8d8f1b8.js",revision:"69ebcc4bc8d8f1b8"},{url:"/_next/static/chunks/pages/guidelines/feed/%5Bid%5D/edit-13bba6b2dafe3a4e.js",revision:"13bba6b2dafe3a4e"},{url:"/_next/static/chunks/pages/guidelines/feed/%5Bid%5D/histories-4fc3a32b9a6902e0.js",revision:"4fc3a32b9a6902e0"},{url:"/_next/static/chunks/pages/guidelines/feed/create-fce26dce1fc11868.js",revision:"fce26dce1fc11868"},{url:"/_next/static/chunks/pages/guidelines/hdep-b1b9e2f1eedf0960.js",revision:"b1b9e2f1eedf0960"},{url:"/_next/static/chunks/pages/guidelines/hdep/%5Bid%5D-afb2f44931b970be.js",revision:"afb2f44931b970be"},{url:"/_next/static/chunks/pages/guidelines/hdep/%5Bid%5D/edit-534a27eecf4ee465.js",revision:"534a27eecf4ee465"},{url:"/_next/static/chunks/pages/guidelines/hdep/%5Bid%5D/histories-f60305d011a0f64c.js",revision:"f60305d011a0f64c"},{url:"/_next/static/chunks/pages/guidelines/hdep/create-d66dd3bde742d990.js",revision:"d66dd3bde742d990"},{url:"/_next/static/chunks/pages/guidelines/hhep-a8352a17cfa8ca46.js",revision:"a8352a17cfa8ca46"},{url:"/_next/static/chunks/pages/guidelines/hhep/%5Bid%5D-506cac479eb97f2f.js",revision:"506cac479eb97f2f"},{url:"/_next/static/chunks/pages/guidelines/hhep/%5Bid%5D/edit-cf131447f263bd94.js",revision:"cf131447f263bd94"},{url:"/_next/static/chunks/pages/guidelines/hhep/%5Bid%5D/histories-8bd3d80b08e97ce9.js",revision:"8bd3d80b08e97ce9"},{url:"/_next/static/chunks/pages/guidelines/hhep/create-be638ae72db76f1f.js",revision:"be638ae72db76f1f"},{url:"/_next/static/chunks/pages/guidelines/weight-8af5f6a3afd8f915.js",revision:"8af5f6a3afd8f915"},{url:"/_next/static/chunks/pages/guidelines/weight/%5Bid%5D-69525e7513a90e75.js",revision:"69525e7513a90e75"},{url:"/_next/static/chunks/pages/guidelines/weight/%5Bid%5D/edit-a0b656a4bb50065e.js",revision:"a0b656a4bb50065e"},{url:"/_next/static/chunks/pages/guidelines/weight/%5Bid%5D/histories-a4ea5ffcf476eb78.js",revision:"a4ea5ffcf476eb78"},{url:"/_next/static/chunks/pages/guidelines/weight/create-70ce73a1d171393f.js",revision:"70ce73a1d171393f"},{url:"/_next/static/chunks/pages/hatchery-6bf4e3b40836be1d.js",revision:"6bf4e3b40836be1d"},{url:"/_next/static/chunks/pages/hatchery/%5Bid%5D-4854ecc4e9d1ab43.js",revision:"4854ecc4e9d1ab43"},{url:"/_next/static/chunks/pages/hatchery/%5Bid%5D/edit-5d77de8a859fa18a.js",revision:"5d77de8a859fa18a"},{url:"/_next/static/chunks/pages/hatchery/%5Bid%5D/histories-085a8ddae714bc49.js",revision:"085a8ddae714bc49"},{url:"/_next/static/chunks/pages/hatchery/create-488e76152783ead1.js",revision:"488e76152783ead1"},{url:"/_next/static/chunks/pages/help-1742674a07d6d889.js",revision:"1742674a07d6d889"},{url:"/_next/static/chunks/pages/hhep-9848a5b49104a05b.js",revision:"9848a5b49104a05b"},{url:"/_next/static/chunks/pages/houses-f28da9ed15c50236.js",revision:"f28da9ed15c50236"},{url:"/_next/static/chunks/pages/houses/%5Bid%5D-fcf5f86752b6526d.js",revision:"fcf5f86752b6526d"},{url:"/_next/static/chunks/pages/houses/%5Bid%5D/edit-6e2b08d3d0eeff82.js",revision:"6e2b08d3d0eeff82"},{url:"/_next/static/chunks/pages/houses/%5Bid%5D/histories-af84d6f87a7fc243.js",revision:"af84d6f87a7fc243"},{url:"/_next/static/chunks/pages/houses/create-07b98bd099113d1b.js",revision:"07b98bd099113d1b"},{url:"/_next/static/chunks/pages/import-job-bb4998891204975b.js",revision:"bb4998891204975b"},{url:"/_next/static/chunks/pages/import-job/%5Bid%5D-97d4bfebfe77d917.js",revision:"97d4bfebfe77d917"},{url:"/_next/static/chunks/pages/import-job/create-11df4ef4b668b76a.js",revision:"11df4ef4b668b76a"},{url:"/_next/static/chunks/pages/incubation-44250ef7b31d1add.js",revision:"44250ef7b31d1add"},{url:"/_next/static/chunks/pages/incubation/%5Bid%5D-2aa003491f225c0f.js",revision:"2aa003491f225c0f"},{url:"/_next/static/chunks/pages/incubation/%5Bid%5D/dashboard-dc087e26b188aeed.js",revision:"dc087e26b188aeed"},{url:"/_next/static/chunks/pages/incubation/%5Bid%5D/edit-42b330dc7bbcf095.js",revision:"42b330dc7bbcf095"},{url:"/_next/static/chunks/pages/incubation/%5Bid%5D/histories-4df0c0de27b098b2.js",revision:"4df0c0de27b098b2"},{url:"/_next/static/chunks/pages/incubation/create-e4676a9ad6befb00.js",revision:"e4676a9ad6befb00"},{url:"/_next/static/chunks/pages/index-3da772ed8e007800.js",revision:"3da772ed8e007800"},{url:"/_next/static/chunks/pages/ingredient-nutrients-e6f7bf906f52cc12.js",revision:"e6f7bf906f52cc12"},{url:"/_next/static/chunks/pages/ingredient-nutrients/%5Bid%5D-41250ac851bdb897.js",revision:"41250ac851bdb897"},{url:"/_next/static/chunks/pages/ingredient-nutrients/%5Bid%5D/edit-e0c0ecd9de95a187.js",revision:"e0c0ecd9de95a187"},{url:"/_next/static/chunks/pages/ingredient-nutrients/%5Bid%5D/histories-daa2f3c0f47dc7e7.js",revision:"daa2f3c0f47dc7e7"},{url:"/_next/static/chunks/pages/ingredient-nutrients/create-fe4236e1363cbe6f.js",revision:"fe4236e1363cbe6f"},{url:"/_next/static/chunks/pages/ingredient-types-817adceee07d509a.js",revision:"817adceee07d509a"},{url:"/_next/static/chunks/pages/ingredient-types/%5Bid%5D-17f34ef2a9c9c636.js",revision:"17f34ef2a9c9c636"},{url:"/_next/static/chunks/pages/ingredient-types/%5Bid%5D/edit-1efb369466edd010.js",revision:"1efb369466edd010"},{url:"/_next/static/chunks/pages/ingredient-types/%5Bid%5D/histories-c8fd12cd8b6678a0.js",revision:"c8fd12cd8b6678a0"},{url:"/_next/static/chunks/pages/ingredient-types/create-7055794b074ddd9d.js",revision:"7055794b074ddd9d"},{url:"/_next/static/chunks/pages/ingredients-0540967b6b43ad4e.js",revision:"0540967b6b43ad4e"},{url:"/_next/static/chunks/pages/ingredients/%5Bid%5D-6d18a1acfe2250db.js",revision:"6d18a1acfe2250db"},{url:"/_next/static/chunks/pages/ingredients/%5Bid%5D/dashboard-13091e643188ef66.js",revision:"13091e643188ef66"},{url:"/_next/static/chunks/pages/ingredients/%5Bid%5D/edit-9e088ba1989011d6.js",revision:"9e088ba1989011d6"},{url:"/_next/static/chunks/pages/ingredients/%5Bid%5D/histories-40a136f8b3f59067.js",revision:"40a136f8b3f59067"},{url:"/_next/static/chunks/pages/ingredients/create-484ea30844c192f8.js",revision:"484ea30844c192f8"},{url:"/_next/static/chunks/pages/invitations-c7cfa9b2ac15d489.js",revision:"c7cfa9b2ac15d489"},{url:"/_next/static/chunks/pages/login-a8dee9b5ee56ab23.js",revision:"a8dee9b5ee56ab23"},{url:"/_next/static/chunks/pages/notifications-40f149193055a598.js",revision:"40f149193055a598"},{url:"/_next/static/chunks/pages/notifications/%5Bid%5D-7a54f727f993a6a1.js",revision:"7a54f727f993a6a1"},{url:"/_next/static/chunks/pages/nutrient-groups-7c6e34c4c351979d.js",revision:"7c6e34c4c351979d"},{url:"/_next/static/chunks/pages/nutrient-groups/%5Bid%5D-df87208f14c96c42.js",revision:"df87208f14c96c42"},{url:"/_next/static/chunks/pages/nutrient-groups/%5Bid%5D/edit-a0712f532dbf332b.js",revision:"a0712f532dbf332b"},{url:"/_next/static/chunks/pages/nutrient-groups/%5Bid%5D/histories-91fc2ebab53eaf1c.js",revision:"91fc2ebab53eaf1c"},{url:"/_next/static/chunks/pages/nutrient-groups/create-cf85a818fa827338.js",revision:"cf85a818fa827338"},{url:"/_next/static/chunks/pages/nutrients-bf10c2c830a53743.js",revision:"bf10c2c830a53743"},{url:"/_next/static/chunks/pages/nutrients/%5Bid%5D-b647085bef274b4c.js",revision:"b647085bef274b4c"},{url:"/_next/static/chunks/pages/nutrients/%5Bid%5D/edit-a36b09e50289be8d.js",revision:"a36b09e50289be8d"},{url:"/_next/static/chunks/pages/nutrients/%5Bid%5D/histories-f841aa75aeaa7af4.js",revision:"f841aa75aeaa7af4"},{url:"/_next/static/chunks/pages/nutrients/create-d4b9dc855fc04483.js",revision:"d4b9dc855fc04483"},{url:"/_next/static/chunks/pages/pedigree-e0f3e10d195c0d2d.js",revision:"e0f3e10d195c0d2d"},{url:"/_next/static/chunks/pages/pen-b6ef21e1645e0bc9.js",revision:"b6ef21e1645e0bc9"},{url:"/_next/static/chunks/pages/pen/%5Bid%5D-00b2552841b9b077.js",revision:"00b2552841b9b077"},{url:"/_next/static/chunks/pages/pen/%5Bid%5D/edit-6e0967bef81231a3.js",revision:"6e0967bef81231a3"},{url:"/_next/static/chunks/pages/pen/%5Bid%5D/histories-5c1a48b43ed87654.js",revision:"5c1a48b43ed87654"},{url:"/_next/static/chunks/pages/pen/create-d18513a10cd02655.js",revision:"d18513a10cd02655"},{url:"/_next/static/chunks/pages/purposes-252c0035e47bd025.js",revision:"252c0035e47bd025"},{url:"/_next/static/chunks/pages/purposes/%5Bid%5D-38014b2319fb422e.js",revision:"38014b2319fb422e"},{url:"/_next/static/chunks/pages/purposes/%5Bid%5D/edit-cfadbaef71c82df2.js",revision:"cfadbaef71c82df2"},{url:"/_next/static/chunks/pages/purposes/%5Bid%5D/histories-7d9f7d09a61ea8c8.js",revision:"7d9f7d09a61ea8c8"},{url:"/_next/static/chunks/pages/purposes/create-5bd82891735746dd.js",revision:"5bd82891735746dd"},{url:"/_next/static/chunks/pages/qr-d16d6d5f4dd8a5fa.js",revision:"d16d6d5f4dd8a5fa"},{url:"/_next/static/chunks/pages/qr/generate-b75877a6bcad7b0c.js",revision:"b75877a6bcad7b0c"},{url:"/_next/static/chunks/pages/reduction-reasons-78d679f8514d0cf0.js",revision:"78d679f8514d0cf0"},{url:"/_next/static/chunks/pages/reduction-reasons/%5Bid%5D-3c11c9cf9abf0bd8.js",revision:"3c11c9cf9abf0bd8"},{url:"/_next/static/chunks/pages/reduction-reasons/%5Bid%5D/edit-9424b4a144ff464b.js",revision:"9424b4a144ff464b"},{url:"/_next/static/chunks/pages/reduction-reasons/%5Bid%5D/histories-d2cf62155c3562d8.js",revision:"d2cf62155c3562d8"},{url:"/_next/static/chunks/pages/reduction-reasons/create-7971d1037513cdb9.js",revision:"7971d1037513cdb9"},{url:"/_next/static/chunks/pages/regions-6db541b11755d8f0.js",revision:"6db541b11755d8f0"},{url:"/_next/static/chunks/pages/reports-ab12fdac4b85b581.js",revision:"ab12fdac4b85b581"},{url:"/_next/static/chunks/pages/reports/avg-egg-weight-dc8ee2c1906e1061.js",revision:"dc8ee2c1906e1061"},{url:"/_next/static/chunks/pages/reports/chicken-record-set-bb80a52624e1e4a1.js",revision:"bb80a52624e1e4a1"},{url:"/_next/static/chunks/pages/reports/egg-grading-39cd89ee6edf84d4.js",revision:"39cd89ee6edf84d4"},{url:"/_next/static/chunks/pages/reports/egg-mass-7e4269480841e74c.js",revision:"7e4269480841e74c"},{url:"/_next/static/chunks/pages/reports/egg-productive-a8ca305ccd9b42c6.js",revision:"a8ca305ccd9b42c6"},{url:"/_next/static/chunks/pages/reports/feed-by-weight-c38e83ad354cb8fe.js",revision:"c38e83ad354cb8fe"},{url:"/_next/static/chunks/pages/reports/feed-graph-52f3032b4f34dd0e.js",revision:"52f3032b4f34dd0e"},{url:"/_next/static/chunks/pages/reports/gender-percentage-distribution-df66ef4f1bdf4c17.js",revision:"df66ef4f1bdf4c17"},{url:"/_next/static/chunks/pages/reports/growth-performance-c88fbd006bfd5d3e.js",revision:"c88fbd006bfd5d3e"},{url:"/_next/static/chunks/pages/reports/hdep-1e5dd7b5cfc45aae.js",revision:"1e5dd7b5cfc45aae"},{url:"/_next/static/chunks/pages/reports/hhep-e236210fd2235ac2.js",revision:"e236210fd2235ac2"},{url:"/_next/static/chunks/pages/reports/livability-e0fbcb61582b75b4.js",revision:"e0fbcb61582b75b4"},{url:"/_next/static/chunks/pages/reports/mortality-8ce4ebb8881ad65e.js",revision:"8ce4ebb8881ad65e"},{url:"/_next/static/chunks/pages/reports/one-click-b7df363c12dffefd.js",revision:"b7df363c12dffefd"},{url:"/_next/static/chunks/pages/reports/weight-graph-bfb6981f5f9449de.js",revision:"bfb6981f5f9449de"},{url:"/_next/static/chunks/pages/requirement-ingredients-439d1579b7b493ba.js",revision:"439d1579b7b493ba"},{url:"/_next/static/chunks/pages/requirement-ingredients/%5Bid%5D-c3a3c3ab720170e9.js",revision:"c3a3c3ab720170e9"},{url:"/_next/static/chunks/pages/requirement-ingredients/%5Bid%5D/edit-6972631ffc51c9fe.js",revision:"6972631ffc51c9fe"},{url:"/_next/static/chunks/pages/requirement-ingredients/%5Bid%5D/histories-5a64e8562b4c64e8.js",revision:"5a64e8562b4c64e8"},{url:"/_next/static/chunks/pages/requirement-ingredients/create-fadba38678e3869c.js",revision:"fadba38678e3869c"},{url:"/_next/static/chunks/pages/requirement-nutrients-085c01d7af958cf8.js",revision:"085c01d7af958cf8"},{url:"/_next/static/chunks/pages/requirement-nutrients/%5Bid%5D-53ac3960f28e61ca.js",revision:"53ac3960f28e61ca"},{url:"/_next/static/chunks/pages/requirement-nutrients/%5Bid%5D/edit-9754b42419c4e3be.js",revision:"9754b42419c4e3be"},{url:"/_next/static/chunks/pages/requirement-nutrients/%5Bid%5D/histories-cef24946a8d8f30c.js",revision:"cef24946a8d8f30c"},{url:"/_next/static/chunks/pages/requirement-nutrients/create-803ef41c42c0c59f.js",revision:"803ef41c42c0c59f"},{url:"/_next/static/chunks/pages/requirements-dab706bd6407b1f0.js",revision:"dab706bd6407b1f0"},{url:"/_next/static/chunks/pages/requirements/%5Bid%5D-b76999c3cce99fa6.js",revision:"b76999c3cce99fa6"},{url:"/_next/static/chunks/pages/requirements/%5Bid%5D/dashboard-399ecd061d0d9138.js",revision:"399ecd061d0d9138"},{url:"/_next/static/chunks/pages/requirements/%5Bid%5D/edit-5bc361ac58f1b5aa.js",revision:"5bc361ac58f1b5aa"},{url:"/_next/static/chunks/pages/requirements/%5Bid%5D/histories-e06837c9ea37c416.js",revision:"e06837c9ea37c416"},{url:"/_next/static/chunks/pages/requirements/create-c9e6d5ea4b5affc3.js",revision:"c9e6d5ea4b5affc3"},{url:"/_next/static/chunks/pages/reset-password-7774a80eb3ef4708.js",revision:"7774a80eb3ef4708"},{url:"/_next/static/chunks/pages/selections/create-18a04306fe7fd699.js",revision:"18a04306fe7fd699"},{url:"/_next/static/chunks/pages/settings-d50cec6b6c7fee46.js",revision:"d50cec6b6c7fee46"},{url:"/_next/static/chunks/pages/sign-up-4396cfbee9cf24c1.js",revision:"4396cfbee9cf24c1"},{url:"/_next/static/chunks/pages/stages-9275695c25c74695.js",revision:"9275695c25c74695"},{url:"/_next/static/chunks/pages/stages/%5Bid%5D-b7b72eebf6cd57e5.js",revision:"b7b72eebf6cd57e5"},{url:"/_next/static/chunks/pages/stages/%5Bid%5D/edit-fb3d156081287676.js",revision:"fb3d156081287676"},{url:"/_next/static/chunks/pages/stages/%5Bid%5D/histories-3d806e2152eefb40.js",revision:"3d806e2152eefb40"},{url:"/_next/static/chunks/pages/stages/create-88c4aa38334dced9.js",revision:"88c4aa38334dced9"},{url:"/_next/static/chunks/pages/unit-converters-238b5f4d46306d36.js",revision:"238b5f4d46306d36"},{url:"/_next/static/chunks/pages/unit-converters/create-855af7581d76aaba.js",revision:"855af7581d76aaba"},{url:"/_next/static/chunks/pages/units-7804e423068873cc.js",revision:"7804e423068873cc"},{url:"/_next/static/chunks/pages/units/%5Bid%5D-a5d67708ff7e4ac1.js",revision:"a5d67708ff7e4ac1"},{url:"/_next/static/chunks/pages/units/%5Bid%5D/edit-fccdc1c387f4b335.js",revision:"fccdc1c387f4b335"},{url:"/_next/static/chunks/pages/units/%5Bid%5D/histories-bdedf575e1abcd5c.js",revision:"bdedf575e1abcd5c"},{url:"/_next/static/chunks/pages/units/create-9a7b18f048c46860.js",revision:"9a7b18f048c46860"},{url:"/_next/static/chunks/pages/users-8cc0a0a31e2eac1e.js",revision:"8cc0a0a31e2eac1e"},{url:"/_next/static/chunks/pages/users/%5Bid%5D-7bf3c6c3af20f1f0.js",revision:"7bf3c6c3af20f1f0"},{url:"/_next/static/chunks/pages/users/%5Bid%5D/edit-46b32b37069884f6.js",revision:"46b32b37069884f6"},{url:"/_next/static/chunks/pages/verify/%5Btoken%5D-692343b1cb9ed9c4.js",revision:"692343b1cb9ed9c4"},{url:"/_next/static/chunks/pages/verify/error-505acde826d970df.js",revision:"505acde826d970df"},{url:"/_next/static/chunks/pages/weights-6401d05db66ffabb.js",revision:"6401d05db66ffabb"},{url:"/_next/static/chunks/pages/weights/%5Bid%5D-b753850f829b3820.js",revision:"b753850f829b3820"},{url:"/_next/static/chunks/pages/weights/%5Bid%5D/edit-1fa01090ede8116a.js",revision:"1fa01090ede8116a"},{url:"/_next/static/chunks/pages/weights/%5Bid%5D/histories-d55ff4d0b9bd26d3.js",revision:"d55ff4d0b9bd26d3"},{url:"/_next/static/chunks/pages/weights/create-554735beb7ad8186.js",revision:"554735beb7ad8186"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-8a2d7eb9c0cb2082.js",revision:"8a2d7eb9c0cb2082"},{url:"/_next/static/css/dbfddef6ea69eb4f.css",revision:"dbfddef6ea69eb4f"},{url:"/_next/static/css/fa6d0cb87d24dc78.css",revision:"fa6d0cb87d24dc78"},{url:"/_next/static/mA8-SqLXqgI04wa88jhII/_buildManifest.js",revision:"be46a2bf0aceb20d4ea61292c933ad4c"},{url:"/_next/static/mA8-SqLXqgI04wa88jhII/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/data/onboarding/lets_get_started.json",revision:"d9fa5c55c69cd47b9b44d18f5e02630e"},{url:"/data/onboarding/switch_farm.json",revision:"d0b04655d50d11c21136026b87396371"},{url:"/data/search.json",revision:"efee83d2d88001e38a543dbfba3e9980"},{url:"/data/users/delete_invited_user.json",revision:"50bbd513e09335f08a11a50b4bf6c903"},{url:"/data/users/invite_user.json",revision:"a1d1fa746c66d90a5cb1e67b5901c790"},{url:"/favicon.ico",revision:"aff27cf06331f176df72154314ac5ec9"},{url:"/images/1569210581281.jpeg",revision:"8736954cf46b6f19449d9fcffe4ca627"},{url:"/images/breeding_data_icon.png",revision:"65b196f47ede63357bdae0b027f97b4e"},{url:"/images/chi1.jpeg",revision:"12c4e250155ae2b6ab1e8cc9df7d2bc9"},{url:"/images/chickens_image.jpg",revision:"4b893ffdeb50e1bed582fb19bd2f414b"},{url:"/images/feed_formulation_icon.png",revision:"f0901e20fabeeb8fe0b1e7a508db075d"},{url:"/images/feed_martix.png",revision:"c159c9758815dfcb013ec4bfcf5c9201"},{url:"/images/hero_2.jpg",revision:"b8cbf622f364f0b40d48f427460272f3"},{url:"/images/hero_3.jpg",revision:"3c5e1ed2cd65aece551d6a887ee26fa5"},{url:"/images/hero_3.png",revision:"a41324b5fb227b415b235eeaac9aada1"},{url:"/images/ilri-cgiar.png",revision:"9082aed4a406d75ac5d5e7265cb2e3ec"},{url:"/images/ilri_logo.png",revision:"d3e8ec6d2c84970cdaced9f8abdf233d"},{url:"/images/logo_full.png",revision:"2d38c249dcce623b4e9a4015dcb66f0f"},{url:"/images/logo_icon.png",revision:"1e4bb06c76d88daef5e78b2c255bb8a1"},{url:"/images/nutration_education_icon.png",revision:"f78def1705084a76d166187735dee6f5"},{url:"/images/placeholder-image.jpg",revision:"aeeca6ed0793fda632abfc0ef04f1bbf"},{url:"/images/tpsg_platforms_icon.png",revision:"ef6da7b7c6a6e1ef5407ff7f14b6dfa5"},{url:"/manifest.json",revision:"ca395310b9680829a029d7e71412727c"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/screenshots/breeding_data_mangement.png",revision:"18a5cc8c0aeca626ef07fc163571656f"},{url:"/screenshots/feed_app_screenshot.png",revision:"ba355d330f0028750e766da728e23eba"},{url:"/screenshots/nutrition_education_mobile_app.png",revision:"061129ca055a63c908f5a50c37fd9959"},{url:"/slash_forward_icon_134959.png",revision:"eb0e74918a89d036c8109b9b2fe74188"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));