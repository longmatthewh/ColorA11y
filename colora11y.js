(function() {
    var root = this;

    var NORM_AA_BIG_AAA = 4.5;
    var BIG_AA = 3;
    var NORM_AAA = 7;

    function calcContrastCompliance(fgColor, bgColor) {
        var compliance = createCompliance();
        var fgLuminance = getLuminance(fgColor.replace('#',''));
        var bgLuminance = getLuminance(bgColor.replace('#',''));
        var ratio = (Math.max(fgLuminance, bgLuminance) + 0.05)/(Math.min(fgLuminance, bgLuminance) + 0.05);

        normAAbigAAAPass(compliance, ratio >= NORM_AA_BIG_AAA);
        compliance.aa.large.pass = (ratio >= BIG_AA);
        compliance.aaa.normal.pass = (ratio >= NORM_AAA);
        compliance.ratio = (Math.round(ratio*100)/100) + ':1';
        return compliance;
    }

    function normAAbigAAAPass(compliance, passFail) {
        compliance.aa.normal.pass = passFail;
        compliance.aaa.large.pass = passFail;
    }

    function getLuminance(color) {
        var red, green, blue;
        if(color.length === 3) {
            red = getsRGB(color.substring(0,1) + color.substring(0,1));
            green = getsRGB(color.substring(1,2) + color.substring(1,2));
            blue = getsRGB(color.substring(2,3) + color.substring(2,3));
        } else {
            red = getsRGB(color.substring(0,2));
            green = getsRGB(color.substring(2,4));
            blue = getsRGB(color.substring(4,6));
        }
        return (0.2126 * red + 0.7152 * green + 0.0722 * blue);
    }

    function getsRGB(color) {
        color = getRGB(color);
        color = color/255;
        color = (color <= 0.03928) ? color/12.92 : Math.pow(((color + 0.055)/1.055), 2.4);
        return color;
    }

    function getRGB(color) {
        return parseInt(color, 16);
    }

    function createCompliance() {
        return {
            aa : {
                normal : {
                    min : NORM_AA_BIG_AAA + ':1'
                },
                large : {
                    min : BIG_AA + ':1'
                }
            },
            aaa : {
                normal : {
                    min : NORM_AAA + ':1'
                },
                large : {
                    min : NORM_AA_BIG_AAA + ':1'
                }
            }
        };
    }

    root.colora11y = {
        calcContrastCompliance : calcContrastCompliance
    };

}.call(this));