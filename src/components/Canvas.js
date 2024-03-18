import { useRef, useEffect, useState } from "react";

function Canvas(props) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();

  const handleMouseDown = (e) => {
    console.log("handleMouseDown");
    const ctx = canvasRef.current.getContext("2d");
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  const handleMouseUp = (e) => {
    console.log("handleMouseUp");
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    console.log("handleMouseMove");
    if (isDrawing) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      canvasRef.current.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current.removeEventListener("mouseup", handleMouseUp);
      canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDrawing]);

  return <canvas ref={canvasRef} width={500} height={500} />;
}

export default Canvas;
