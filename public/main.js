const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) throw new Error("not supported here");

