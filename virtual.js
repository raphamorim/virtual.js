(function() {
    'use strict'

    var SETTINGS = {
        canvasName: 'virtual-canvas',
        vrIcon: null,
        canvas: null,
    }, TO_LOAD = 0

    function initWebGL(canvas) {
        var gl = null;

        try {
            gl = (
                canvas.getContext("webgl") ||
                canvas.getContext("experimental-webgl")
            )
        }
        catch(e) {}

        if (!gl) {
            console.warn("Unable to initialize WebGL. Your browser may not support it.");
            gl = null;
        }

        return gl;
    }

    function runVR() {
        var gl = initWebGL(SETTINGS.canvas);

        var vertexShaderSrc = "attribute vec3 aVertexPosition; uniform mat4 uMVMatrix; uniform mat4 uPMatrix; void main(void) { gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); }";

        var fragmentShaderSrc = "void main(void) { " +
            "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }";

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSrc);
        gl.compileShader(vertexShader);

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSrc);
        gl.compileShader(fragmentShader);

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        gl.useProgram(program);
    }

    function loadAssets() {
        var assets = document.querySelectorAll('virtual v-assets img')

        TO_LOAD = assets.length
        for (var i = 0; i < assets.length; i++) {
            if (assets[i].src) {
                TO_LOAD -= 1
            } else {
                assets[i].addEventListener('load', function() {
                    TO_LOAD -= 1
                    if (TO_LOAD === 0)
                        runVR();
                });
            }
        }

        if (TO_LOAD === 0)
            runVR();
    }

    /* Append enterVR element on Body */
    function createEnterVRIcon() {
        var vrIcon = document.createElement('button')

        vrIcon.style.right = '20px'
        vrIcon.style.bottom = 0
        vrIcon.style.border = 0
        vrIcon.style.cursor = 'pointer'
        vrIcon.style.position = 'absolute'
        vrIcon.style.opacity = .65
        vrIcon.style.zIndex = 999999
        vrIcon.style.height = '60px'
        vrIcon.style.width = '60px'
        vrIcon.style.background = 'url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20245.82%20141.73%22%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill%3A%23fff%3Bfill-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Ctitle%3Emask%3C%2Ftitle%3E%3Cpath%20class%3D%22a%22%20d%3D%22M175.56%2C111.37c-22.52%2C0-40.77-18.84-40.77-42.07S153%2C27.24%2C175.56%2C27.24s40.77%2C18.84%2C40.77%2C42.07S198.08%2C111.37%2C175.56%2C111.37ZM26.84%2C69.31c0-23.23%2C18.25-42.07%2C40.77-42.07s40.77%2C18.84%2C40.77%2C42.07-18.26%2C42.07-40.77%2C42.07S26.84%2C92.54%2C26.84%2C69.31ZM27.27%2C0C11.54%2C0%2C0%2C12.34%2C0%2C28.58V110.9c0%2C16.24%2C11.54%2C30.83%2C27.27%2C30.83H99.57c2.17%2C0%2C4.19-1.83%2C5.4-3.7L116.47%2C118a8%2C8%2C0%2C0%2C1%2C12.52-.18l11.51%2C20.34c1.2%2C1.86%2C3.22%2C3.61%2C5.39%2C3.61h72.29c15.74%2C0%2C27.63-14.6%2C27.63-30.83V28.58C245.82%2C12.34%2C233.93%2C0%2C218.19%2C0H27.27Z%22%2F%3E%3C%2Fsvg%3E) 50% 50%/70% 70% no-repeat #EF988E'

        document.body.appendChild(vrIcon)
        return vrIcon
    }

    function createCanvas() {
        var canvas = document.createElement('canvas')
        canvas.id = SETTINGS.canvasName
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.position = 'absolute'
        canvas.style.top = 0
        canvas.style.left = 0

        document.body.appendChild(canvas)
        return canvas
    }

    function start() {
        var virtual = document.getElementsByTagName('virtual')[0]

        if (!virtual)
            return console.warn('No <virtual> tag founded!')

        virtual.style.display = 'none'

        SETTINGS.vrIcon = createEnterVRIcon()
        SETTINGS.canvas = createCanvas()
        loadAssets()
    }

    document.addEventListener('DOMContentLoaded', function() {
        start()
    });
})()