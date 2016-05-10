# Vianna.js

> Use markup to create VR slide presentations that work across desktop, iOS, Android, and the Oculus Rift.

## Usage

Initialize vianna.js before body

```html

<script type="text/javascript" src="vianna.js"></script>
</body>

```

Define Slide presentation

```html

<vianna>
    <v-assets>
        <img src="img/slide_1.png" id="slide-1">
        <img src="img/slide_2.jpg" id="slide-2">
        <img src="img/slide_3.gif" id="slide-3">
    </v-assets>

    <v-image src="#slide-1" order="1"/>
    <v-image src="#slide-2" order="2"/>
    <v-image src="#slide-3" order="3"/>

    <v-html order="4"/>
        <h1>The End</h1>
    </v-html>
</vianna>

```