function Graph(context)
{
	this.ctx = context;
	this.xA = -0.5;
	this.xB = 4;
	this.yA = -0.5;
	this.yB = 4;
	this.lines = [];
	this.points = [];
	this._points = [];
	this.bgColor = "#FAFAFA";
	this.showLines = false;
}
		
Graph.prototype.clearCanvas = function()
{
	this.ctx.fillStyle = this.bgColor;
	this.ctx.fillRect(0,0,400,400);
}
		
Graph.prototype.x2c = function(x)
{
	return (x - this.xA) / (this.xB - this.xA) * 400;
}

Graph.prototype.y2c = function(y)
{
	return 400 - ((y - this.yA) / (this.yB - this.yA) * 400);
}

Graph.prototype.setAxis = function()
{
	// Ejes cartesianos
	this.ctx.lineWidth = 2;
	this.ctx.fillStyle = "#000000";
	this.ctx.strokeStyle = "#000000";
	if(this.xA < 0 && 0 < this.xB)
	{
		var x0 = this.x2c(0);
		this.ctx.beginPath();
		this.ctx.moveTo(x0,0);
		this.ctx.lineTo(x0,400);
		this.ctx.stroke();
	}
	if(this.yA < 0 && 0 < this.yB)
	{
		var y0 = this.y2c(0);
		this.ctx.beginPath();
		this.ctx.moveTo(0,y0);
		this.ctx.lineTo(400,y0);
		this.ctx.stroke();
	}
	
	// Puntos de referencia
	this.ctx.lineWidth = 1;
	this.ctx.fillStyle = "#EEEEEE";
	this.ctx.strokeStyle = "#090909";
	
	var xS = (this.xB - this.xA) / 40;
	var yS = (this.yB - this.yA) / 40;
	this.ctx.beginPath();
	for(var i = this.xA - this.xA % xS; i < this.xB; i+= xS)
		for(var j = this.yA - this.yA % yS; j < this.yB; j+= yS)
		{
			var xL = this.x2c(i);
			var yL = this.y2c(j);
			this.ctx.moveTo(xL-1,yL);
			this.ctx.lineTo(xL,yL);
		}
		
	this.ctx.stroke();
}

Graph.prototype.repaint = function()
{
	this.clearCanvas();
	this.setAxis();
	this.paintObjects();
}

Graph.prototype._point = function(x,y, color)
{
	this.ctx.beginPath();
	this.ctx.fillStyle = color;
	this.ctx.arc(this.x2c(x),this.y2c(y), 3, 0, 2 * Math.PI, true);
	this.ctx.fill();
}

Graph.prototype.addPoint = function(i,x,y, color)
{
	if(typeof color === "undefined") color = "#00FF00";
	this._point(x,y,color);
	return this.points.push([x,y,color]);
}

Graph.prototype.addPoints = function(i,p, color)
{
	if(typeof color === "undefined") color = "#00FF00";
	return this._points[i] =[p,color];
}

Graph.prototype.clearPoints = function(i)
{
	return this._points[i] = null;
}


Graph.prototype._line = function(x0,y0,x1,y1, color)
{
	this.ctx.beginPath();
	this.ctx.strokeStyle = color;
	this.ctx.moveTo(this.x2c(x0),this.y2c(y0));
	this.ctx.lineTo(this.x2c(x1),this.y2c(y1));
	this.ctx.stroke();
}

Graph.prototype.addLine = function(x0,y0,x1,y1, color)
{
	if(typeof color === "undefined") color = "#FF0000";
	
	this._line(x0,y0,x1,y1, color);
	return this.lines.push([x0,y0,x1,y1,color]);
}

Graph.prototype.clearLines = function()
{
	this.lines = [];
	this.repaint();
}

Graph.prototype.removeLine = function(l)
{
	if(l && this.lines[l-1])
	{
		this.lines[l-1] = null;
		this.repaint();
	}
}

Graph.prototype.clearPoints = function()
{
	this.points = [];
	this.repaint();
}

Graph.prototype.removePoint = function(p)
{
	if(p && this.points[p-1])
	{
		this.points[p-1] = null;
		this.repaint();
	}
}

Graph.prototype.clearAll = function()
{
	this.lines = [];
	this.points = [];
	this.repaint();
}

Graph.prototype.setLimits = function(xA, xB, yA, yB)
{
	this.xA = xA;
	this.xB = xB;
	this.yA = yA;
	this.yB = yB;
	this.repaint();
}


Graph.prototype.paintObjects = function()
{
	for(i in this.lines)
		if(this.lines[i])
			this._line(this.lines[i][0],this.lines[i][1],this.lines[i][2],this.lines[i][3],this.lines[i][4]);
	for(p in this._points)
	{
		var points = this._points[p];
		if(points)
		{	
			var X = points[0]["x"];
			var Y = points[0]["y"];
			var color = points[1];
			for(i in X)
				if(X[i] != null && Y[i] != null)
				{
					this._point(X[i],Y[i],color);
					var n = parseInt(i)+1;
					if(X[i] != null && Y[i] != null && this.showLines)
						this._line(X[i],Y[i],X[n],Y[n],color);
				}
		}
	}
}


Graph.prototype.coordinates = function(x,y)
{
	this.ctx.lineWidth = 1;
	this.ctx.fillStyle = "#000000";
	this.ctx.strokeStyle = "#000000";
	
	var x0 = this.x2c(0);
	var y0 = this.y2c(0);
	xc = this.x2c(x);
	yc = this.y2c(y);
	
	this.ctx.beginPath();
	this.ctx.moveTo(x0,yc);
	this.ctx.lineTo(xc,yc);
	this.ctx.stroke();

	this.ctx.beginPath();
	this.ctx.moveTo(xc,y0);
	this.ctx.lineTo(xc,yc);
	this.ctx.stroke();
	
	this.ctx.fillText(""+x,x0+2,yc-2);
	this.ctx.fillText(""+y,xc+2,y0-2);
}
