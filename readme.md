# Graph
## GraphEval
Общая часть вычислителя графа. 

Имена параметров функций парсятся для последующей подстановки значений. 

Отсутствие повторных вычислений одной ноды достигается при помощи мемоизации вызовов функций. 

Отслеживается наличие циклов и запрос неизвестных нод.
## LazyGraph
Ленивая реализация. На самом деле, GraphEval сразу получился ленивым.
## EagerGraph
Реализация с вычислением всех нод при передаче графа. Возможно стоило бы вынести вычисление нод на момент первого запроса.
## decorators
Декотораторы, удобные для отладки:
* perfomanceLogger позволяет замерять время вычисления каждой ноды
* callLogger выводит на консоль сообщение о начале вычисления ноды
* valueLogger выводит на консоль результат вычисления ноды
* counterFactory создает декоратор для подсчета числа вызовов вычисления ноды

## sum.js
Реализация каррирования без возвращения новой функции. К сожалению, тогда не удалось изолировать состояние объекта.
