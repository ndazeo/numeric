function euler(x, y, f, h, n)
{
	var a = [];
	
	for(var i = 1; i <= n; i++)
	{				
		x[i] = x[i-1] + h; 
		
		a[i-1] = f( x[i-1], y[i-1]);
		
		y[i] = y[i-1] + h * a[i-1];
	}
	
	return {x:x, y:y, a:a};
}

function euler_mej(x, y, f, h, n)
{
	var p = [];
	var a = []; 
	
	for(var i = 1; i <= n; i++)
	{				
		x[i] = x[i-1] + h; 
		
		p[i-1] = y[i-1] + h * f( x[i-1], y[i-1]);
		
		a[i-1] = 0.5 * ( f( x[i-1], y[i-1]) + f(x[i], p[i-1]) );
		
		y[i] = y[i-1] + h * a[i-1];
		
	}
	
	return {x:x, y:y, a:a, p:p};
}

function rungekutta(x, y, f, h, n)
{
	var k1 = []; var k2 = []; var k3 = []; var k4 = [];
	var a = [];
	
	for(var i = 1; i <= n; i++)
	{				
		x[i] = x[i-1] + h; 
				
		k1[i-1] = f( x[i-1]				, y[i-1]						);
		k2[i-1] = f( x[i-1] + h * 0.5	, y[i-1] + h * k1[i-1] * 0.5	);
		k3[i-1] = f( x[i-1] + h * 0.5	, y[i-1] + h * k2[i-1] * 0.5	);
		k4[i-1] = f( x[i-1] + h			, y[i-1] + h * k3[i-1]			);
		
		a[i-1] = (1.0/6) * ( k1[i-1] + 2 * k2[i-1] + 2 * k3[i-1] + k4[i-1] );		
		
		y[i] = y[i-1] + h * a[i-1];
		
		
	}
	return {x:x,y:y,a:a,k1:k1,k2:k2,k3:k3,k4:k4};
}

metodo = [];
metodo["euler"] = euler;
metodo["euler_mej"] = euler_mej;
metodo["rungekutta"] = rungekutta;

tabla = [];
tabla["euler"] = {a:"Pendiente"};
tabla["euler_mej"] = {p:"p",a:"Pendiente"};
tabla["rungekutta"] = {a:"Pendiente","k1":"k1","k2":"k2","k3":"k3","k4":"k4"};


