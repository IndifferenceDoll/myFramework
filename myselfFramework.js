/*
 方法说明
 *
 @method 方法名
 *
 @for 所属类名
 *
 @param {参数类型} 参数名 参数说明
 *
 @return {返回值类型} 返回值说明
 */
 ;(function(){  // 自执行函数，用于做隔离
    var myModuleMap = {}; // 用来存放注册模块的对象
    var noop = function () {
    };
    window.myUtils = {// 挂载在window对象上的一个全局对象，即框架自身
        /*
        方法说明
        *
        @method define 用来注册模块（模块存储结构）
        *
        @for myUtils
        *
        @param {参数类型} 参数名 参数说明
        string name myModuleMap对象的属性名
        array dependencies 存放依赖的数组(依赖指跟这个注册了的模块有使用上的依赖关系的其他被注册的模块，数组里的是它们的模块名字)
        function factory 该模块的工厂方法,用来实现一部分操作和实例化所有的依赖模块
        *
        @return {返回值类型} 返回值说明
        object 被注册的模块
        */
        define: function(name, dependencies, factory) {
            if (!myModuleMap[name]) {
                var module = {
                    name: name,
                    dependencies: dependencies,
                    factory: factory
                };
                myModuleMap[name] = module;
            }
            return myModuleMap[name];
        },
        
        /*
        方法说明
        *
        @method use 用来取用模块（模块存储结构）
        *
        @for myUtils
        *
        @param {参数类型} 参数名 参数说明
        string name myModuleMap对象的属性名（即对应模块的名字）
        *
        @return {返回值类型} 返回值说明
        object 该模块的entity属性（里面缓存了该模块实例化了的依赖的所有模块）
        */
        use: function(name) {
            var module = moduleMap[name];
        
            if (!module.entity) {// 判断该模块用来缓存实例化了的依赖模块，若没有，则以递归的方式缓存实例化后的所有依赖模块
                var args = [];
                for (var i=0; i<module.dependencies.length; i++) {
                    if (moduleMap[module.dependencies[i]].entity) {
                        args.push(moduleMap[module.dependencies[i]].entity);
                    }
                    else {
                        args.push(this.use(module.dependencies[i]));
                    }
                }
        
                module.entity = module.factory.apply(noop, args);
            }
        
            return module.entity;
        }

    }

})()
