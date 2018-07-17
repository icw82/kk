CHANGELOG
=========

### 0.18
* __rand__ Теперь функция выдаёт случайный хлемент массива, который передан
  в неё первым аргументом;

### 0.17
* __watch__ Новые слушатели, назначенные в процессе выполения обхода
  существующих слушателей, теперь корректно исполняются после обхода;

### 0.16
* __watch__ Теперь аргументы в callback это предыдущее значнеие и новое,
  без ссылки на объект;
* __watch__ Не срабатывает, если присвоение значения есть, но оно не меняется.

### 0.15
* __watch__ Теперь в callback принимается kk.Event;
* __is__ Проверка типов теперь в отдельном модуле.

### 0.14
* __format__ Новый метод: capitalize.

### 0.13
* __format__ Новые методы: camelize и decamelize.

### 0.6
* __Event__ Теперь имеет состояние выполненного события. При создании новых слушателей
  их функции выполняются сразу же.

### 0.5
* __get_buffer__ is _Promise_ now
* __each__: enumeration of pseudo array now returns index of item
    in first argument of callback function.

### 0.4
* improve __find_ancestor__

### 0.3
* kk.Event class
* __each__: now third argument passed to callback function. It's a link to source array.

#### 0.2.1
* sourcemaps removed

### 0.2
* now 'each' function can return False

### 0.1
* improve __each__ function

#### 0.0.19
* kk.proxy

#### 0.0.18
* fix: viewport

#### 0.0.17
* —

#### 0.0.16
* kk.viewport

#### 0.0.15
* 'each' return true now

#### 0.0.14
* Array Buffer in Each: fix

#### 0.0.13
 * Array Buffer in Each: fix

#### 0.0.12
* Array Buffer in Each

#### 0.0.11
* each: + HTMLCollection

#### 0.0.10
* fix find_sncestor

#### 0.0.9
* kk.class_forever
* kk.find_ancestor
* kk.generate_key
* kk.get_buffer

#### 0.0.8
* fix: each

#### 0.0.7
* kk.format
* fixes

#### 0.0.6
* plural_ru
* get_window_params

#### 0.0.5
* stop event

#### 0.0.4
* i8

#### 0.0.3
* class and toggle_class (D)
