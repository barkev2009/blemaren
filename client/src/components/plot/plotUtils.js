export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color = '#bdbdbd', thickness = 0) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX + thickness, upperLeftCornerY + thickness, width - thickness * 2, height - thickness * 2);
    ctx.restore();
}

export const drawRandomBarPlot = (canvasRef) => {
    const ctx = canvasRef.current.getContext('2d');

    const width = 40;
    const windowHeight = canvasRef.current.height - 20;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let i = 0; i < Math.floor(canvasRef.current.width / width); i++) {
        const height = Math.floor(Math.random() * 100);
        drawBar(ctx, i * width, windowHeight - height, width, height, getRandomColor(), 0.8);
    }

}

export const drawRandomHeatMap = (canvasRef) => {
    const ctx = canvasRef.current.getContext('2d');

    const width = 50;
    const height = 50;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let x = 0; x < Math.floor(canvasRef.current.width / width); x++) {
        for (let y = 0; y < Math.floor(canvasRef.current.height / height); y++) {
            drawBar(ctx, x * width, y * height, width, height, getRandomColor(), 0.8);
        }
    }
}