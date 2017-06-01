var tipuesearch = {"pages":[{"url":"./pages/about/","tags":"misc","text":"2016Fall 修課成員網誌","title":"About"},{"url":"./w15lian-xi.html","tags":"作業","text":"本周內容 40423152 52齒 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r =250 # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"#66009D\") ctx.fillStyle = \"#33FF33\" ctx.font = \"30px ScriptS\" ctx.fillText(\"40423152\",(canvas.width)/2-60,(canvas.height)/2) ctx.stroke() ctx.beginPath() ctx.lineWidth = \"600\" ctx.strokeStyle = \"white\" ctx.moveTo(0,600) ctx.lineTo(800,600) ctx.stroke() div = doc[\"onegear_div\"] GGG window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); }","title":"w15練習"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-shi-er-ce-shi-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/5 y = (canvas.height)/5 r = 0.5*(canvas.height/2) # 齒數 n = 5 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 17 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(2*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 13 np3=10 # gear ratio gr = n/np gr2 = n/np3 gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) # 利用 gear 資料複製一份, 命名為 gear1 gear1 = gear.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) set_interval(draw, 2) 設法處理兩種正齒輪嚙合的協同繪圖 (17t-11t-13t): # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear8\" 的 canvas 中繪圖 canvas = doc[\"gear8\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 17 # 第2齒輪齒數 n_g2 = 11 # 第3齒輪齒數 n_g3 = 13 n_g4 = 13 n_g5 = 13 n_g6 = 13 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3+n_g4+n_g5+n_g6) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 rp_g4 = m*n_g4/2 rp_g5 = m*n_g5/2 rp_g6 = m*n_g6/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.2+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 x_g3 = x_g1 + rp_g1 + 3*rp_g2 + 2*rp_g3 y_g3 = y_g1 x_g4 = x_g1 + rp_g1 + 4*rp_g2 + 3*rp_g3+ rp_g4 y_g4 = y_g1 x_g5 = x_g1 + rp_g1 + 5*rp_g2 + 4*rp_g3+ 2*rp_g4+rp_g5 y_g5 = y_g1 x_g6 = x_g1 + rp_g1 + 6*rp_g2 + 5*rp_g3+ 3*rp_g4+2*rp_g5+rp_g6 y_g6 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"#00FF00\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"#FF0088\") ctx.restore() # 將第3齒輪逆時鐘轉 90 度之後, 再往回轉第2齒輪定位帶動轉角, 然後再逆時鐘多轉一齒, 以便與第2齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage # math.pi+math.pi/n_g2 為第2齒輪從順時鐘轉 90 度之後, 必須配合目前的標記線所作的齒輪 2 轉動角度, 要轉換到齒輪3 的轉動角度 # 必須乘上兩齒輪齒數的比例, 若齒輪2 大, 則齒輪3 會轉動較快 # 第1個 -math.pi/2 為將原先垂直的第3齒輪定位線逆時鐘旋轉 90 度 # -math.pi/n_g3 則是第3齒與第2齒定位線重合後, 必須再逆時鐘多轉一齒的轉角, 以便進行囓合 # (math.pi+math.pi/n_g2)*n_g2/n_g3 則是第2齒原定位線為順時鐘轉動 90 度, # 但是第2齒輪為了與第1齒輪囓合, 已經距離定位線, 多轉了 180 度, 再加上第2齒輪的一齒角度, 因為要帶動第3齒輪定位, # 這個修正角度必須要再配合第2齒與第3齒的轉速比加以轉換成第3齒輪的轉角, 因此乘上 n_g2/n_g3 ctx.rotate(-math.pi/2-math.pi/n_g3+(math.pi+math.pi/n_g2)*n_g2/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"#66009D\") ctx.restore() ctx.save() ctx.translate(x_g4, y_g4) ctx.rotate(-math.pi/2-math.pi/n_g4+(math.pi+math.pi/n_g3)*n_g3/n_g4) ctx.translate(-x_g4, -y_g4) Spur(ctx).Gear(x_g4, y_g4, rp_g4, n_g4, pa, \"#66009D\") ctx.restore() ctx.save() ctx.translate(x_g5, y_g5) ctx.rotate(-math.pi/2-math.pi/n_g5+(math.pi+math.pi/n_g4)*n_g4/n_g5) ctx.translate(-x_g5, -y_g5) Spur(ctx).Gear(x_g5, y_g5, rp_g5, n_g5, pa, \"#66009D\") ctx.restore() ctx.save() ctx.translate(x_g6, y_g6) ctx.rotate(-math.pi/2-math.pi/n_g6+(math.pi+math.pi/n_g5)*n_g5/n_g6) ctx.translate(-x_g6, -y_g6) Spur(ctx).Gear(x_g6, y_g6, rp_g6, n_g6, pa, \"#66009D\") ctx.restore()","title":"協同產品設計實習 第十二測試周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-shi-er-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear3\" 的 canvas 中繪圖 canvas = doc['gear3'] ctx = canvas.getContext(\"2d\") pa = 20 # 齒數 n1 = 17 n2 = 11 n3 = 13 # 壓力角 m = (0.8*canvas.width)/(n1+n2+n3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n1/2 rp_g2 = m*n2/2 rp_g3 = m*n3/2 x_g1 = canvas.width*0.1+rp_g1 y_g1 = canvas.height*0.2+rp_g1 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 ctx.save() ctx.translate(x_g1, y_g1) ctx.rotate(math.pi/2) ctx.translate(-x_g1, -y_g1) Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"#FF0088\") ctx.restore() ctx.save() ctx.translate(x_g2, y_g2) ctx.rotate(-math.pi/2-math.pi/n_g2) ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"#00FF00\") ctx.restore() ctx.save() ctx.translate(x_g3, y_g3) ctx.rotate(-math.pi/2-math.pi/n_g3+(math.pi+math.pi/n_g2)*n_g2/n_g3) ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"#66009D\") ctx.restore()","title":"協同產品設計實習 第十二周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-shi-yi-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 1.閱讀關於Onshape的兩本書籍，當中看到一項十分中肯(如附圖)的事實 對於此已經十分\"習慣\"Solidworks的我來說十分便利，而且也較solvespace人性化，又有像是github一樣的commit紀錄，隨時追蹤設計狀況。 一開始對於線上的soliworks(就是onshape)覺得應該是閹割過的版本吧，不過做得盡善盡美，輸出DXF也是沒有問題的。 重點是他居然可以線上協作，這是令我最喜歡也最驚豔的功能。 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n = 10 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 以下列出 W11 2B 未出席人數 data = open(\"./../data/w11/2b0503.txt\", encoding=\"utf-8\").read() count = 0 # 去掉前面兩列 student = data.split(\"\\n\")[2:] for i in range(len(student)): each = student[i].split(\"\\t\") if each[1] != \"出席\": count = count + 1 #print(count) div = doc[\"onegear_div\"] div <= \"2b: \" + str(count) + \"/\" + str(len(student)) # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 17 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.8*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(2*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 13 # gear ratio gr = n/np gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) # 利用 gear 資料複製一份, 命名為 gear1 gear1 = gear.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) set_interval(draw, 2)","title":"協同產品設計實習 第十一周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-shi-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 在python上面執行加減乘除 當時在上課時構思能否用html語法進行互動 後來老師使用Brython執行成功 不過似乎不能消除前面的值 以下程式碼以Python呈現 互動程式已Brython呈現 四則運算 def add(a,b): //加法運算法則 return a+b import sys//加法運算程式 sys.path.append(\"./m1\") import add sum=add.add(a,b) print(sum) 測試加法 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math container = doc['container'] degree = math.pi/180 def button1(event): a = input(\"give me a\") b = input(\"give me b\") container <= str(float(a)+float(b)) doc[\"button1\"].bind(\"click\", button1) 按下請定義值 def minus(a,b)://減法運算法則 return a-b import sys//減法運算程式 sys.path.append(\"./m1\") import minus sum=minus.minus(a,b) 測試減法 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math container = doc['container1'] degree = math.pi/180 def button2(event): a = input(\"give me a\") b = input(\"give me b\") container <= str(float(a)-float(b)) doc[\"button2\"].bind(\"click\", button2) 按下請定義值 print(sum)def cross(a,b)://乘法運算法則 return a*b import sys//乘法運算程式 sys.path.append(\"./m1\") import cross sum=cross.cross(a,b) 測試乘法 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math container = doc['container3'] degree = math.pi/180 def button3(event): a = input(\"give me a\") b = input(\"give me b\") container <= str(float(a)*float(b)) doc[\"button3\"].bind(\"click\", button3) 按下請定義值 print(sum)def div(a,b)://除法運算法則 return a/b import sys//除法運算程式 sys.path.append(\"./m1\") import div sum=div.div(a,b) print(sum) 測試除法 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math container = doc['container4'] degree = math.pi/180 def button4(event): a = input(\"give me a\") b = input(\"give me b\") container <= str(float(a)/float(b)) doc[\"button4\"].bind(\"click\", button4) 按下請定義值 40423152-國立虎尾科技大學-機械設計工程系-四則運算 from Willy Lai on Vimeo .","title":"協同產品設計實習 第十周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-jiu-zhou-zuo-ye-qi-zhong-kao-40423152.html","tags":"作業","text":"總查驗 本周內容 1.小組fossil serve在上課時已查驗 2.各組員倉儲中的 T 點軌跡座標檔 Brython 可是他跑不出來.... 程式碼節錄自本人leo window.onload=function(){ brython(1); } from browser import document as doc from browser import html import math # 準備繪圖畫布 canvas = doc[\"fourbar\"] container1 = doc['container1'] ctx = canvas.getContext(\"2d\") fourbar_data = open(\"./../work/HW.csv\").read() fourbar_list = fourbar_data.splitlines() #container1 <= fourbar_list[0] # 以下可以利用 ctx 物件進行畫圖 # 先畫一條直線 ctx.beginPath() # 設定線的寬度為 1 個單位 ctx.lineWidth = 0.5 # 利用 transform 將 y 座標反轉, 且 offset canvas.height # (X scale, X skew, Y skew, Y scale, X offset, Y offset) # 配合圖形位置進行座標轉換 ctx.transform(1, 0, 0, -1, canvas.width/2+250, canvas.height/2+100) # 畫出 x 與 y 座標線 # 各座標值放大 8 倍 ratio = 8 ctx.moveTo(0, 0) ctx.lineTo(-30*ratio, 0) start_point = fourbar_list[0].split(\",\") ctx.moveTo(float(start_point[0])*ratio, float(start_point[1])*ratio) count = 0 for data in fourbar_list[1:]: point = data.split(\",\") #count = count + 1 #container1 <= str(count) + \":\" + point[0] + \",\" + point[1] #container1 <= html.BR() ctx.lineTo(float(point[0])*ratio, float(point[1])*ratio) # 設定顏色為藍色, 也可以使用 \"rgb(0, 0, 255)\" 字串設定顏色值 ctx.strokeStyle = \"blue\" # 實際執行畫線 ctx.stroke() ctx.closePath() 影片如下 40423152-國立虎尾科技大學-機械設計工程系-trace point from Willy Lai on Vimeo . 3.四足行走模擬 40423152-國立虎尾科技大學-機械設計工程系-四足 from Willy Lai on Vimeo . 4.STL viewer 利用 Madeleine 程式庫 , 擷取位於 ./../data/foot.stl 位置的零件 stl 格式檔案: 近端跑得出來 遠端無法..... 附上近端圖片 window.onload = function(){ var madeleine = new Madeleine({ target: 'target', // target div id data: './../data/foot.stl', // data path path: './../data/madeleine/src/' // path to source directory from current html file }); }; select stl file: or drop stl file","title":"協同產品設計實習 第九周作業(期中考) 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-ba-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 所有影片統整 四連桿實體版本 首要零件繪製如下 2017-03-02 00-32-32 from Willy Lai on Vimeo . stunnel ip 更改 2017-03-21_01-26-02 from Willy Lai on Vimeo . 導入Vrep 2017-03-02 11-27-18 from Willy Lai on Vimeo . 翻譯影片 20170309 from Willy Lai on Vimeo . fossil建立倉儲 2017-03-21_01-27-43 from Willy Lai on Vimeo . 小螺旋槳旋轉 錄製_2017_04_13_02_29_05_3 from Willy Lai on Vimeo . 八連桿繪製 8bars from Willy Lai on Vimeo . 八連桿導入V-rep 錄製_2017_04_12_22_49_21_902 from Willy Lai on Vimeo . 心得: 期中考將近，大家一起加油，每周作業顧名思義，應該分擔在每一周，不要跟自己學分過不去","title":"協同產品設計實習 第八周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-liu-yu-di-qi-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 將八連桿畫出之後導入V-rep讓他動起來 八連桿繪製 影片是由solvespace建立 8bars from Willy Lai on Vimeo . 但後來發現onshape較為人性化 故使用onshape完成 八連桿導入V-rep 錄製_2017_04_12_22_49_21_902 from Willy Lai on Vimeo . 心得: 八連桿貼上關節花了不少時間，建立起來後，雖然動得十分緩慢，但富有成就感。","title":"協同產品設計實習 第六與第七周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-wu-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 在V-rep讓小螺旋槳旋轉 影片如下 錄製_2017_04_13_02_29_05_3 from Willy Lai on Vimeo . 心得: 製作起來十分簡單，還蠻好玩的。","title":"協同產品設計實習 第五周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-si-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 在小黑窗鍵入 fossil init 檔名.fossil 表示建立一個新的倉儲 2017-03-21_01-27-43 from Willy Lai on Vimeo . 馬上利用fossil創造一個新的倉儲，也改了一個新的start.bat，變成全自動的好酷，不過當時在設定時不知為何有時跑出題是視窗有時卻沒有提示視窗.....多花了一點時間。 心得: 禁行批次檔的更改，並了解批次檔的語法，十分有趣的過程。","title":"協同產品設計實習 第四周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-san-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 翻譯影片 20170309 from Willy Lai on Vimeo . 過程中有利用youtube的字幕，但超多錯誤，所以邊參考邊逐行逐行聽，有些聯音的部分在亞洲大學生耳裡還是很不習慣。 心得: 老師說的可以參考youtube字幕，個人親自翻譯之後發現上面字幕有許多顯而易見的錯誤，不過至少有部分可以參考，很辛苦，不過很有學習價值。","title":"協同產品設計實習 第三周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-er-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 stunnel ip 更改 2017-03-21_01-26-02 from Willy Lai on Vimeo . 四連桿實體版本 2017-03-02 00-32-32 from Willy Lai on Vimeo . 拼湊部分的影片 2017-03-02 10-48-51 from Willy Lai on Vimeo . 導入Vrep 2017-03-02 11-27-18 from Willy Lai on Vimeo . 20170301 心得: 原本看起來很單調的四連桿導入V-rep之後看起來十分有趣","title":"協同產品設計實習 第二周作業 40423152"},{"url":"./xie-tong-chan-pin-she-ji-shi-xi-di-yi-zhou-zuo-ye-40423152.html","tags":"作業","text":"本周內容 四連桿實體版本 首要零件繪製如下 其餘零件如法炮製 2017-03-02 00-32-32 from Willy Lai on Vimeo . 拼湊部分如同以前組立一般 完成如下圖所示之四連桿 每周任務 1.有沒有辦法在每週上課後第1堂下課之前, 在各組網誌上呈現當週各學員的出席情況與座次表? 固定座位的部分已在同學提供的ethercalc上劃位完成，每周上課點名可的方式可以使用該表格進行註記。 座位表如下(截至20170301 23:30) 2.各組員會不會從無到有, 自行打造此一可攜程式系統? 還在進行討論，不過看起來是可以的，缺失檔案不算多，從50MB的成長成700MB似乎是可行的，不過要從零開始還需要學習。 3.各組有沒有能力自行維護區域網路上的協同產品設計主機? 就現階段一切尚未板上釘釘，我認為是可以的，現實層面遇到問題時，會再進行處理。 如何呈現階段性的設計實習成果? 追蹤每周網誌可以展現每周是否有完成老師交代之任務。 5.看到最終目標為做出四足行走機構，十分興奮 腦中浮現關於它的身影 20170301","title":"協同產品設計實習 第一周作業 40423152"}]};