package web.logic.core;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HitCheckTest {

    @ParameterizedTest(name = "{index}: {4}")
    @CsvSource(value = {
            //треугольник x >= 0, y > 0, x + y < r / 2
            "0.5 | 0.5 | 4 | true  | точка внутри области треугольника",
            "2.0 | 1.0 | 4 | false | точка вне треугольника из-за условия x + y",
            "1.0 | 1.0 | 4 | false | граница треугольника не включается",
            "0.0 | 1.0 | 4 | true  | треугольник включает сторону на оси Y при y > 0",

            //сектор x > 0, y < 0, sqrt(x^2 + y^2) <= r / 2
            "1.0 | -1.0 | 4 | true  | точка внутри области сектора",
            "3.0 | -3.0 | 4 | false | точка вне сектора из-за превышения радиуса",
            "2.0 | 0.0  | 4 | false | сектор не включает ось X",
            "2.0 | -0.0 | 4 | false | сектор требует строго y < 0",

            //прямоугольник x < 0, y > 0, x > -r / 2, y < r
            "-1.0 | 2.0 | 4 | true  | точка внутри области прямоугольника",
            "-3.0 | 2.0 | 4 | false | точка вне прямоугольника по координате X",
            "-1.0 | 5.0 | 4 | false | точка вне прямоугольника по координате Y",
            "-2.0 | 2.0 | 4 | false | левая граница прямоугольника не включается",
            "-1.0 | 4.0 | 4 | false | верхняя граница прямоугольника не включается",

            //пустые области и оси
            "-1.0 | -1.0 | 4 | false | третья четверть не содержит области",
            "1.0  | 1.5  | 4 | false | первая четверть, но точка вне треугольника",
            "0.0  | 0.0  | 4 | false | начало координат не входит в область",
            "0.0  | -1.0 | 4 | false | отрицательная часть оси Y не входит в область"
    }, delimiter = '|')
    void shouldCheckHitByEquivalenceClasses(
            float x,
            float y,
            float r,
            boolean expected,
            String equivalenceClass
    ) {
        HitCheck hitCheck = new HitCheck(x, y, r);

        boolean actual = hitCheck.wasThereHit();

        assertEquals(expected, actual, equivalenceClass);
    }
}