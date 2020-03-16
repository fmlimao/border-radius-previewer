var App = new Vue({
    el: '#AppVue',
    data: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16,
        codes: [],
        styles: [],
        style: '',
        styleFormatted: '',
    },
    watch: {
        'topLeft': function () {
            App.updateCode();
        },
        'topRight': function () {
            App.updateCode();
        },
        'bottomLeft': function () {
            App.updateCode();
        },
        'bottomRight': function () {
            App.updateCode();
        },
    },
    methods: {
        updateCode: function () {
            App.clearValues();
            App.calculateCodes();
            App.generateStyles();
        },

        clearValues: function () {
            App.topLeft = App.clearValue(App.topLeft);
            App.topRight = App.clearValue(App.topRight);
            App.bottomLeft = App.clearValue(App.bottomLeft);
            App.bottomRight = App.clearValue(App.bottomRight);
        },

        clearValue: function (value) {
            if (isNaN(value)) value = 0;
            if (value < 0) value = 0;
            if (value > 100) value = 100;
            value = parseInt(value);
            return value;
        },

        calculateCodes: function () {
            App.codes = [];

            if (
                App.topLeft == App.topRight
                && App.topLeft == App.bottomLeft
                && App.topLeft == App.bottomRight
            ) {
                App.codes.push(App.topLeft);
            } else if (
                App.topLeft == App.bottomRight
                && App.topRight == App.bottomLeft
            ) {
                App.codes.push(App.topLeft);
                App.codes.push(App.topRight);
            } else {
                App.codes.push(App.topLeft);
                App.codes.push(App.topRight);
                App.codes.push(App.bottomRight);
                App.codes.push(App.bottomLeft);
            }
        },

        generateStyles: function () {
            App.styles = [];

            const values = App.codes.reduce(function (a, c) {
                a.push(c + (c ? 'px' : ''));
                return a;
            }, []).join(' ');

            App.styles.push(`-webkit-border-radius: ${values};`);
            App.styles.push(`-moz-border-radius: ${values};`);
            App.styles.push(`border-radius: ${values};`);

            App.style = App.styles.join(' ');
            App.styleFormatted = App.styles.join('\n');
        },
    },
});

App.updateCode();
