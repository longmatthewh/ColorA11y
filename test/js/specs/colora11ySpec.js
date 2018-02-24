var colora11y = require('../../../colora11y.js');

describe('colora11y', function() {
    it('ratio is 21:1 for black on white', function() {
        var compliance = colora11y.calcContrastCompliance('#000000', '#ffffff');
        expect(compliance.ratio).toBe('21:1');
        expect(compliance.aa.normal.pass).toBe(true);
        expect(compliance.aa.large.pass).toBe(true);
        expect(compliance.aaa.normal.pass).toBe(true);
        expect(compliance.aaa.large.pass).toBe(true);
    });

    it('ratio is 1:1 for black on black', function() {
        var compliance = colora11y.calcContrastCompliance('#000000', '#000000');
        expect(compliance.ratio).toBe('1:1');
        expect(compliance.aa.normal.pass).toBe(false);
        expect(compliance.aa.large.pass).toBe(false);
        expect(compliance.aaa.normal.pass).toBe(false);
        expect(compliance.aaa.large.pass).toBe(false);
    });

    it('ratio is 5.74:1 for grey on white', function() {
        var compliance = colora11y.calcContrastCompliance('#666666', '#ffffff');
        expect(compliance.ratio).toBe('5.74:1');
        expect(compliance.aa.normal.pass).toBe(true);
        expect(compliance.aa.large.pass).toBe(true);
        expect(compliance.aaa.normal.pass).toBe(false);
        expect(compliance.aaa.large.pass).toBe(true);
    });

    it('ratio is 3.54:1 for lighter grey on white', function() {
        var compliance = colora11y.calcContrastCompliance('#888888', '#ffffff');
        expect(compliance.ratio).toBe('3.54:1');
        expect(compliance.aa.normal.pass).toBe(false);
        expect(compliance.aa.large.pass).toBe(true);
        expect(compliance.aaa.normal.pass).toBe(false);
        expect(compliance.aaa.large.pass).toBe(false);
    });

    it('works with 3 digit hex', function() {
        expect(colora11y.calcContrastCompliance('#000', '#fff').ratio).toBe('21:1');
        expect(colora11y.calcContrastCompliance('#000', '#000').ratio).toBe('1:1');
        expect(colora11y.calcContrastCompliance('#666', '#fff').ratio).toBe('5.74:1');
        expect(colora11y.calcContrastCompliance('#888', '#fff').ratio).toBe('3.54:1');
    });

    it('works with rgb', function() {
        expect(colora11y.calcContrastCompliance('rgb(0, 0,0)', 'rgb(255,255,255)').ratio).toBe('21:1');
        expect(colora11y.calcContrastCompliance('rgb(0, 0, 0)', 'rgb(0,0, 0)').ratio).toBe('1:1');
    });
});