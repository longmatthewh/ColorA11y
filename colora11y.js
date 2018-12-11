(function() {
    let root = this;

    const NORM_AA_BIG_AAA = 4.5;
    const BIG_AA = 3;
    const NON_TEXT_AA = 3;
    const NORM_AAA = 7;

    let normAAbigAAAPass = (compliance, passFail) => {
        compliance.aa.normal.pass = passFail;
        compliance.aaa.large.pass = passFail;
    };

    let getLuminanceFromRGB = ({red, green, blue}) => {
        return (
            0.2126 * getsRGB(red) +
            0.7152 * getsRGB(green) +
            0.0722 * getsRGB(blue)
        );
    };

    let fromHexStr = (color) => {
        let red;
        let green;
        let blue;
        if (color.length === 3) {
            red = getRGB(color.substring(0, 1) + color.substring(0, 1));
            green = getRGB(color.substring(1, 2) + color.substring(1, 2));
            blue = getRGB(color.substring(2, 3) + color.substring(2, 3));
        } else {
            red = getRGB(color.substring(0, 2));
            green = getRGB(color.substring(2, 4));
            blue = getRGB(color.substring(4, 6));
        }
        return {red, green, blue};
    };

    let fromRgbStr = (color) => {
        let matchColors = colorTypeConverter.rgbStr.pattern;
        let [, red, green, blue] = matchColors.exec(color);
        return {red, green, blue};
    };

    const colorTypeConverter = {
        hexStr: {
            pattern: /^(?:[0-9a-f]{3}){1,2}$/i,
            converter: fromHexStr,
        },
        rgbStr: {
            pattern: /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/,
            converter: fromRgbStr,
        },
    };

    let getLuminance = (color) => {
        let convertFunc = (function(color) {
            for (let converter in colorTypeConverter) {
                if (color.match(colorTypeConverter[converter].pattern)) {
                    return colorTypeConverter[converter].converter;
                }
            }
        })(color);
        return getLuminanceFromRGB(convertFunc(color));
    };

    let getsRGB = (color) => {
        color = color/255;
        if (color <= 0.03928) {
            return color/12.92;
        }
        return Math.pow(((color + 0.055)/1.055), 2.4);
    };

    let getRGB = (color) => {
        return parseInt(color, 16);
    };

    let createCompliance = () => {
        return {
            aa: {
                normal: {
                    min: NORM_AA_BIG_AAA + ':1',
                },
                large: {
                    min: BIG_AA + ':1',
                },
                nontext: {
                    min: NON_TEXT_AA + ':1',
                },
            },
            aaa: {
                normal: {
                    min: NORM_AAA + ':1',
                },
                large: {
                    min: NORM_AA_BIG_AAA + ':1',
                },
            },
        };
    };

    let calcRatio = (fgColor, bgColor) => {
        let fgLuminance = getLuminance(fgColor.replace('#', ''));
        let bgLuminance = getLuminance(bgColor.replace('#', ''));
        let lighterColorLuminance = Math.max(fgLuminance, bgLuminance);
        let darkerColorLuminance = Math.min(fgLuminance, bgLuminance);

        return (lighterColorLuminance + 0.05) / (darkerColorLuminance + 0.05);
    };

    let calcComplianceFromRatio = (ratio) => {
        let compliance = createCompliance();
        normAAbigAAAPass(compliance, ratio >= NORM_AA_BIG_AAA);
        compliance.aa.large.pass = (ratio >= BIG_AA);
        compliance.aa.nontext.pass = (ratio >= NON_TEXT_AA);
        compliance.aaa.normal.pass = (ratio >= NORM_AAA);
        compliance.ratio = (Math.round(ratio * 100) / 100) + ':1';
        return compliance;
    };

    root.calcContrastCompliance = (fgColor, bgColor) => {
        return calcComplianceFromRatio(calcRatio(fgColor, bgColor));
    };
}).call(this);
