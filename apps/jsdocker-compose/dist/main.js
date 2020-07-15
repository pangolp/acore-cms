!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("child_process")},function(e,t,n){const s=n(1),i=n(0);var o=n(9);const r=i.join(__dirname,"conf.js");s.existsSync()&&(o=n(10)(r)),e.exports=o},function(e,t,n){const s=n(5),i=n(7),o=n(3);function r(e){return e.option("-s, --service <name>","Name of main service",o.docker_service_name),e}function a(e,{stop:t=!1,remove:n=!1}={}){e.option("-t, --stop","Stop docker container after exit, cannot be used with --rm",t).option("-r, --rm","Remove docker container after exit, cannot be used with --stop",n).option("-c, --run-cmd <cmd>","Command to use for direct run on docker instances","npm run")}s.name("jsdocker-compose").description("Command to manage docker instances");const c=s.command("run-foreground");c.alias("run:fg").description("Run docker services in foreground").arguments("[cmdArgs...]").action((e,t)=>{i("fg",e,t),process.exit(0)}),r(c),a(c);const h=s.command("run-background");h.alias("run:bg").description("Run docker services in background").arguments("[cmdArgs...]").action((e,t)=>{i("bg",e,t),process.exit(0)}),r(h),a(h);const l=s.command("run-shell");l.alias("run:shell").description("Run docker services with a shell").action(e=>{i("shell",[],e),process.exit(0)}),r(l),a(l);const p=s.command("stop");p.description("Stop docker services").action(e=>{i("stop",[],e),process.exit(0)}),r(p);const m=s.command("build");m.description("Build docker image").action(e=>{i("build",[],e),process.exit(0)}),r(m);const d=s.command("remove");d.alias("rm").description("Remove docker services").action(e=>{i("remove",[],e),process.exit(0)}),r(d),s.on("command:*",(function(){console.error("Invalid command: %s\nSee --help for a list of available commands.",s.args.join(" ")),process.exit(1)})),s.parse(process.argv),s.help()},function(e,t,n){const s=n(6).EventEmitter,i=n(2).spawn,o=n(0),r=n(1);class a{constructor(e,t){this.flags=e,this.required=e.indexOf("<")>=0,this.optional=e.indexOf("[")>=0,this.mandatory=!1,this.negate=-1!==e.indexOf("-no-");const n=e.split(/[ ,|]+/);n.length>1&&!/^[[<]/.test(n[1])&&(this.short=n.shift()),this.long=n.shift(),this.description=t||"",this.defaultValue=void 0}name(){return this.long.replace(/^--/,"")}attributeName(){return this.name().replace(/^no-/,"").split("-").reduce((e,t)=>e+t[0].toUpperCase()+t.slice(1))}is(e){return this.short===e||this.long===e}}class c extends Error{constructor(e,t,n){super(n),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=t,this.exitCode=e,this.nestedError=void 0}}class h extends s{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._args=[],this.rawArgs=null,this._scriptPath=null,this._name=e||"",this._optionValues={},this._storeOptionsAsProperties=!0,this._passCommandToAction=!0,this._actionResults=[],this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._hidden=!1,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._hasImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command"}command(e,t,n){let s=t,i=n;"object"==typeof s&&null!==s&&(i=s,s=null),i=i||{};const o=e.split(/ +/),r=this.createCommand(o.shift());return s&&(r.description(s),r._executableHandler=!0),i.isDefault&&(this._defaultCommandName=r._name),r._hidden=!(!i.noHelp&&!i.hidden),r._helpFlags=this._helpFlags,r._helpDescription=this._helpDescription,r._helpShortFlag=this._helpShortFlag,r._helpLongFlag=this._helpLongFlag,r._helpCommandName=this._helpCommandName,r._helpCommandnameAndArgs=this._helpCommandnameAndArgs,r._helpCommandDescription=this._helpCommandDescription,r._exitCallback=this._exitCallback,r._storeOptionsAsProperties=this._storeOptionsAsProperties,r._passCommandToAction=this._passCommandToAction,r._executableFile=i.executableFile||null,this.commands.push(r),r._parseExpectedArgs(o),r.parent=this,s?this:r}createCommand(e){return new h(e)}addCommand(e,t){if(!e._name)throw new Error("Command passed to .addCommand() must have a name");return function e(t){t.forEach(t=>{if(t._executableHandler&&!t._executableFile)throw new Error("Must specify executableFile for deeply nested executable: "+t.name());e(t.commands)})}(e.commands),(t=t||{}).isDefault&&(this._defaultCommandName=e._name),(t.noHelp||t.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}arguments(e){return this._parseExpectedArgs(e.split(/ +/))}addHelpCommand(e,t){return!1===e?this._hasImplicitHelpCommand=!1:(this._hasImplicitHelpCommand=!0,"string"==typeof e&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=t||this._helpCommandDescription),this}_lazyHasImplicitHelpCommand(){return void 0===this._hasImplicitHelpCommand&&(this._hasImplicitHelpCommand=this.commands.length&&!this._actionHandler&&!this._findCommand("help")),this._hasImplicitHelpCommand}_parseExpectedArgs(e){if(e.length)return e.forEach(e=>{const t={required:!1,name:"",variadic:!1};switch(e[0]){case"<":t.required=!0,t.name=e.slice(1,-1);break;case"[":t.name=e.slice(1,-1)}t.name.length>3&&"..."===t.name.slice(-3)&&(t.variadic=!0,t.name=t.name.slice(0,-3)),t.name&&this._args.push(t)}),this._args.forEach((e,t)=>{if(e.variadic&&t<this._args.length-1)throw new Error(`only the last argument can be variadic '${e.name}'`)}),this}exitOverride(e){return this._exitCallback=e||(e=>{if("commander.executeSubCommandAsync"!==e.code)throw e}),this}_exit(e,t,n){this._exitCallback&&this._exitCallback(new c(e,t,n)),process.exit(e)}action(e){return this._actionHandler=t=>{const n=this._args.length,s=t.slice(0,n);this._passCommandToAction?s[n]=this:s[n]=this.opts(),t.length>n&&s.push(t.slice(n));const i=e.apply(this,s);let o=this;for(;o.parent;)o=o.parent;o._actionResults.push(i)},this}_optionEx(e,t,n,s,i){const o=new a(t,n),r=o.name(),c=o.attributeName();if(o.mandatory=!!e.mandatory,"function"!=typeof s)if(s instanceof RegExp){const e=s;s=(t,n)=>{const s=e.exec(t);return s?s[0]:n}}else i=s,s=null;if(o.negate||o.optional||o.required||"boolean"==typeof i){if(o.negate){const e=o.long.replace(/^--no-/,"--");i=!this._findOption(e)||this._getOptionValue(c)}void 0!==i&&(this._setOptionValue(c,i),o.defaultValue=i)}return this.options.push(o),this.on("option:"+r,e=>{null!==e&&s&&(e=s(e,void 0===this._getOptionValue(c)?i:this._getOptionValue(c))),"boolean"==typeof this._getOptionValue(c)||void 0===this._getOptionValue(c)?null==e?this._setOptionValue(c,!o.negate&&(i||!0)):this._setOptionValue(c,e):null!==e&&this._setOptionValue(c,!o.negate&&e)}),this}option(e,t,n,s){return this._optionEx({},e,t,n,s)}requiredOption(e,t,n,s){return this._optionEx({mandatory:!0},e,t,n,s)}allowUnknownOption(e){return this._allowUnknownOption=void 0===e||e,this}storeOptionsAsProperties(e){if(this._storeOptionsAsProperties=void 0===e||e,this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this}passCommandToAction(e){return this._passCommandToAction=void 0===e||e,this}_setOptionValue(e,t){this._storeOptionsAsProperties?this[e]=t:this._optionValues[e]=t}_getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}parse(e,t){if(void 0!==e&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");let n;switch(t=t||{},void 0===e&&(e=process.argv,process.versions&&process.versions.electron&&(t.from="electron")),this.rawArgs=e.slice(),t.from){case void 0:case"node":this._scriptPath=e[1],n=e.slice(2);break;case"electron":process.defaultApp?(this._scriptPath=e[1],n=e.slice(2)):n=e.slice(1);break;case"user":n=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${t.from}' }`)}return!this._scriptPath&&process.mainModule&&(this._scriptPath=process.mainModule.filename),this._name=this._name||this._scriptPath&&o.basename(this._scriptPath,o.extname(this._scriptPath)),this._parseCommand([],n),this}parseAsync(e,t){return this.parse(e,t),Promise.all(this._actionResults).then(()=>this)}_executeSubCommand(e,t){t=t.slice();let n=!1;const s=[".js",".ts",".mjs"];this._checkForMissingMandatoryOptions();const a=this._scriptPath;let h;try{const e=r.realpathSync(a);h=o.dirname(e)}catch(e){h="."}let l=o.basename(a,o.extname(a))+"-"+e._name;e._executableFile&&(l=e._executableFile);const p=o.join(h,l);let m;r.existsSync(p)?l=p:s.forEach(e=>{r.existsSync(`${p}${e}`)&&(l=`${p}${e}`)}),n=s.includes(o.extname(l)),"win32"!==process.platform?n?(t.unshift(l),t=_(process.execArgv).concat(t),m=i(process.argv[0],t,{stdio:"inherit"})):m=i(l,t,{stdio:"inherit"}):(t.unshift(l),t=_(process.execArgv).concat(t),m=i(process.execPath,t,{stdio:"inherit"}));["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(e=>{process.on(e,()=>{!1===m.killed&&null===m.exitCode&&m.kill(e)})});const d=this._exitCallback;d?m.on("close",()=>{d(new c(process.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):m.on("close",process.exit.bind(process)),m.on("error",t=>{if("ENOENT"===t.code){const t=`'${l}' does not exist\n - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name`;throw new Error(t)}if("EACCES"===t.code)throw new Error(`'${l}' not executable`);if(d){const e=new c(1,"commander.executeSubCommandAsync","(error)");e.nestedError=t,d(e)}else process.exit(1)}),this.runningCommand=m}_dispatchSubcommand(e,t,n){const s=this._findCommand(e);s||this._helpAndError(),s._executableHandler?this._executeSubCommand(s,t.concat(n)):s._parseCommand(t,n)}_parseCommand(e,t){const n=this.parseOptions(t);if(e=e.concat(n.operands),t=n.unknown,this.args=e.concat(t),e&&this._findCommand(e[0]))this._dispatchSubcommand(e[0],e.slice(1),t);else if(this._lazyHasImplicitHelpCommand()&&e[0]===this._helpCommandName)1===e.length?this.help():this._dispatchSubcommand(e[1],[],[this._helpLongFlag]);else if(this._defaultCommandName)d(this,t),this._dispatchSubcommand(this._defaultCommandName,e,t);else if(!this.commands.length||0!==this.args.length||this._actionHandler||this._defaultCommandName||this._helpAndError(),d(this,n.unknown),this._checkForMissingMandatoryOptions(),n.unknown.length>0&&this.unknownOption(n.unknown[0]),this._actionHandler){const n=this.args.slice();this._args.forEach((e,t)=>{e.required&&null==n[t]?this.missingArgument(e.name):e.variadic&&(n[t]=n.splice(t))}),this._actionHandler(n),this.emit("command:"+this.name(),e,t)}else e.length?this._findCommand("*")?this._dispatchSubcommand("*",e,t):this.listenerCount("command:*")?this.emit("command:*",e,t):this.commands.length&&this.unknownCommand():this.commands.length&&this._helpAndError()}_findCommand(e){if(e)return this.commands.find(t=>t._name===e||t._aliases.includes(e))}_findOption(e){return this.options.find(t=>t.is(e))}_checkForMissingMandatoryOptions(){for(let e=this;e;e=e.parent)e.options.forEach(t=>{t.mandatory&&void 0===e._getOptionValue(t.attributeName())&&e.missingMandatoryOptionValue(t)})}parseOptions(e){const t=[],n=[];let s=t;const i=e.slice();function o(e){return e.length>1&&"-"===e[0]}for(;i.length;){const e=i.shift();if("--"===e){s===n&&s.push(e),s.push(...i);break}if(o(e)){const t=this._findOption(e);if(t){if(t.required){const e=i.shift();void 0===e&&this.optionMissingArgument(t),this.emit("option:"+t.name(),e)}else if(t.optional){let e=null;i.length>0&&!o(i[0])&&(e=i.shift()),this.emit("option:"+t.name(),e)}else this.emit("option:"+t.name());continue}}if(e.length>2&&"-"===e[0]&&"-"!==e[1]){const t=this._findOption("-"+e[1]);if(t){t.required||t.optional?this.emit("option:"+t.name(),e.slice(2)):(this.emit("option:"+t.name()),i.unshift("-"+e.slice(2)));continue}}if(/^--[^=]+=/.test(e)){const t=e.indexOf("="),n=this._findOption(e.slice(0,t));if(n&&(n.required||n.optional)){this.emit("option:"+n.name(),e.slice(t+1));continue}}e.length>1&&"-"===e[0]&&(s=n),s.push(e)}return{operands:t,unknown:n}}opts(){if(this._storeOptionsAsProperties){const e={},t=this.options.length;for(let n=0;n<t;n++){const t=this.options[n].attributeName();e[t]=t===this._versionOptionName?this._version:this[t]}return e}return this._optionValues}missingArgument(e){const t=`error: missing required argument '${e}'`;console.error(t),this._exit(1,"commander.missingArgument",t)}optionMissingArgument(e,t){let n;n=t?`error: option '${e.flags}' argument missing, got '${t}'`:`error: option '${e.flags}' argument missing`,console.error(n),this._exit(1,"commander.optionMissingArgument",n)}missingMandatoryOptionValue(e){const t=`error: required option '${e.flags}' not specified`;console.error(t),this._exit(1,"commander.missingMandatoryOptionValue",t)}unknownOption(e){if(this._allowUnknownOption)return;const t=`error: unknown option '${e}'`;console.error(t),this._exit(1,"commander.unknownOption",t)}unknownCommand(){const e=[this.name()];for(let t=this.parent;t;t=t.parent)e.unshift(t.name());const t=e.join(" "),n=`error: unknown command '${this.args[0]}'. See '${t} ${this._helpLongFlag}'.`;console.error(n),this._exit(1,"commander.unknownCommand",n)}version(e,t,n){if(void 0===e)return this._version;this._version=e;const s=new a(t=t||"-V, --version",n=n||"output the version number");return this._versionOptionName=s.long.substr(2)||"version",this.options.push(s),this.on("option:"+this._versionOptionName,()=>{process.stdout.write(e+"\n"),this._exit(0,"commander.version",e)}),this}description(e,t){return void 0===e&&void 0===t?this._description:(this._description=e,this._argsDescription=t,this)}alias(e){if(void 0===e)return this._aliases[0];let t=this;if(0!==this.commands.length&&this.commands[this.commands.length-1]._executableHandler&&(t=this.commands[this.commands.length-1]),e===t._name)throw new Error("Command alias can't be the same as its name");return t._aliases.push(e),this}aliases(e){return void 0===e?this._aliases:(e.forEach(e=>this.alias(e)),this)}usage(e){if(void 0===e){if(this._usage)return this._usage;const e=this._args.map(e=>u(e));return"[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+e.join(" "):"")}return this._usage=e,this}name(e){return void 0===e?this._name:(this._name=e,this)}prepareCommands(){const e=this.commands.filter(e=>!e._hidden).map(e=>{const t=e._args.map(e=>u(e)).join(" ");return[e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(t?" "+t:""),e._description]});return this._lazyHasImplicitHelpCommand()&&e.push([this._helpCommandnameAndArgs,this._helpCommandDescription]),e}largestCommandLength(){return this.prepareCommands().reduce((e,t)=>Math.max(e,t[0].length),0)}largestOptionLength(){const e=[].slice.call(this.options);return e.push({flags:this._helpFlags}),e.reduce((e,t)=>Math.max(e,t.flags.length),0)}largestArgLength(){return this._args.reduce((e,t)=>Math.max(e,t.name.length),0)}padWidth(){let e=this.largestOptionLength();return this._argsDescription&&this._args.length&&this.largestArgLength()>e&&(e=this.largestArgLength()),this.commands&&this.commands.length&&this.largestCommandLength()>e&&(e=this.largestCommandLength()),e}optionHelp(){const e=this.padWidth(),t=(process.stdout.columns||80)-e-4;function n(n,s){return l(n,e)+"  "+m(s,t,e+2)}const s=this.options.map(e=>{const t=e.description+(e.negate||void 0===e.defaultValue?"":" (default: "+JSON.stringify(e.defaultValue)+")");return n(e.flags,t)}),i=this._helpShortFlag&&!this._findOption(this._helpShortFlag),o=!this._findOption(this._helpLongFlag);if(i||o){let e=this._helpFlags;i?o||(e=this._helpShortFlag):e=this._helpLongFlag,s.push(n(e,this._helpDescription))}return s.join("\n")}commandHelp(){if(!this.commands.length&&!this._lazyHasImplicitHelpCommand())return"";const e=this.prepareCommands(),t=this.padWidth(),n=(process.stdout.columns||80)-t-4;return["Commands:",e.map(e=>{const s=e[1]?"  "+e[1]:"";return(s?l(e[0],t):e[0])+m(s,n,t+2)}).join("\n").replace(/^/gm,"  "),""].join("\n")}helpInformation(){let e=[];if(this._description){e=[this._description,""];const t=this._argsDescription;if(t&&this._args.length){const n=this.padWidth(),s=(process.stdout.columns||80)-n-5;e.push("Arguments:"),e.push(""),this._args.forEach(i=>{e.push("  "+l(i.name,n)+"  "+p(t[i.name],s,n+4))}),e.push("")}}let t=this._name;this._aliases[0]&&(t=t+"|"+this._aliases[0]);let n="";for(let e=this.parent;e;e=e.parent)n=e.name()+" "+n;const s=["Usage: "+n+t+" "+this.usage(),""];let i=[];const o=this.commandHelp();o&&(i=[o]);const r=["Options:",""+this.optionHelp().replace(/^/gm,"  "),""];return s.concat(e).concat(r).concat(i).join("\n")}outputHelp(e){e||(e=e=>e);const t=e(this.helpInformation());if("string"!=typeof t&&!Buffer.isBuffer(t))throw new Error("outputHelp callback must return a string or a Buffer");process.stdout.write(t),this.emit(this._helpLongFlag)}helpOption(e,t){this._helpFlags=e||this._helpFlags,this._helpDescription=t||this._helpDescription;const n=this._helpFlags.split(/[ ,|]+/);return this._helpShortFlag=void 0,n.length>1&&(this._helpShortFlag=n.shift()),this._helpLongFlag=n.shift(),this}help(e){this.outputHelp(e),this._exit(process.exitCode||0,"commander.help","(outputHelp)")}_helpAndError(){this.outputHelp(),this._exit(1,"commander.help","(outputHelp)")}}function l(e,t){const n=Math.max(0,t-e.length);return e+Array(n+1).join(" ")}function p(e,t,n){const s=new RegExp(".{1,"+(t-1)+"}([\\s​]|$)|[^\\s​]+?([\\s​]|$)","g");return(e.match(s)||[]).map((e,t)=>("\n"===e.slice(-1)&&(e=e.slice(0,e.length-1)),(t>0&&n?Array(n+1).join(" "):"")+e.trimRight())).join("\n")}function m(e,t,n){if(e.match(/[\n]\s+/))return e;return t<40?e:p(e,t,n)}function d(e,t){t.find(t=>t===e._helpLongFlag||t===e._helpShortFlag)&&(e.outputHelp(),e._exit(0,"commander.helpDisplayed","(outputHelp)"))}function u(e){const t=e.name+(!0===e.variadic?"...":"");return e.required?"<"+t+">":"["+t+"]"}function _(e){return e.map(e=>{let t=e;if(0===e.indexOf("--inspect")){let n,s,i="127.0.0.1",o="9229";null!==(s=e.match(/^(--inspect(-brk)?)$/))?n=s[1]:null!==(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))?(n=s[1],/^\d+$/.test(s[3])?o=s[3]:i=s[3]):null!==(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))&&(n=s[1],i=s[3],o=s[4]),n&&"0"!==o&&(t=`${n}=${i}:${parseInt(o)+1}`)}return t})}(t=e.exports=new h).program=t,t.Command=h,t.Option=a,t.CommanderError=c},function(e,t){e.exports=require("events")},function(e,t,n){const s=n(8);s.config({path:".env.local"}),s.config({path:".env"});const i=n(1),o=n(0),{execSync:r}=n(2),a=n(3);function c(){try{r("docker-compose up --no-build --no-start",{stdio:"pipe",cwd:a.docker_base_dir})}catch(e){if(e.stderr.toString().includes("needs to be built"))return!0}return!1}function h(){i.writeFile("var/packagehash.txt","",{flag:"wx"},(function(){}))}function l(){if(a.docker_inject_sshkey){const e=n(11).homedir();let t=i.readFileSync(o.resolve(e+"/.ssh/id_rsa")).toString();t=t.replace(/\r\n/g,"\n"),t=t.replace(/\n/g,"\\n");let s=i.readFileSync(o.resolve(e+"/.ssh/id_rsa.pub")).toString();return s=s.replace(/\r\n/g,"\n"),s=s.replace(/\n/g,"\\n"),`docker-compose build --force-rm --no-cache --build-arg idrsa="${t}" --build-arg idrsapub="${s}"`}return"docker-compose build --force-rm --no-cache"}e.exports=async function(e,t,{service:n=a.docker_service_name,runCmd:s=a.docker_run_command,remove:o=!1,stop:p=!1}){var m=t.join(" "),d=" -f docker-compose.yml ",u="true";o?u=" docker-compose down":p&&(u=" docker-compose stop");const _=`docker-compose ${d+=a.docker_extra_args} up -d --no-build --remove-orphans`;var g="",f=!1;switch(e){case"fg":f=c(),a.docker_packagehash_support&&h(),g=m.length>0?`${_} && docker-compose exec ${n} ${s} ${m} || ${u}`:`docker-compose ${d} up --no-build --remove-orphans || ${u}`;break;case"bg":f=c(),a.docker_packagehash_support&&h(),g=m.length>0?`${_} && docker-compose exec -d ${n} ${s} ${m} || ${u}`:`${_} || ${u}`;break;case"shell":{a.docker_packagehash_support&&h();let e=function(e){let t,n;return t=r("docker ps -q --no-trunc").toString(),n=r("docker-compose ps -q "+e).toString(),t.indexOf(n)>=0}(n);e||(f=c()),g=`${e?"":_+" && "} docker-compose exec ${n} bash || ${u}`;break}case"remove":g="docker-compose down -v --remove-orphans --rmi local",i.unlinkSync("var/packagehash.txt");break;case"stop":g="docker-compose stop";break;case"build":g=l();break;default:g="npm run "+e+" "+m}f&&(console.log("Building..."),r(l(),{stdio:"inherit",cwd:a.docker_base_dir})),console.log("Running: "+g),r(g,{stdio:"inherit",cwd:a.docker_base_dir})}},function(e,t,n){const s=n(1),i=n(0);function o(e){console.log("[dotenv][DEBUG] "+e)}const r=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,a=/\\n/g,c=/\n|\r|\r\n/;function h(e,t){const n=Boolean(t&&t.debug),s={};return e.toString().split(c).forEach((function(e,t){const i=e.match(r);if(null!=i){const e=i[1];let t=i[2]||"";const n=t.length-1,o='"'===t[0]&&'"'===t[n];"'"===t[0]&&"'"===t[n]||o?(t=t.substring(1,n),o&&(t=t.replace(a,"\n"))):t=t.trim(),s[e]=t}else n&&o(`did not match key and value when parsing line ${t+1}: ${e}`)})),s}e.exports.config=function(e){let t=i.resolve(process.cwd(),".env"),n="utf8",r=!1;e&&(null!=e.path&&(t=e.path),null!=e.encoding&&(n=e.encoding),null!=e.debug&&(r=!0));try{const e=h(s.readFileSync(t,{encoding:n}),{debug:r});return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?r&&o(`"${t}" is already defined in \`process.env\` and will not be overwritten`):process.env[t]=e[t]})),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=h},function(e,t){e.exports={docker_service_name:process.env.DOCKER_SERVICE_NAME||"node-server",docker_inject_sshkey:"true"===process.env.DOCKER_INJECT_SSHKEY||!1,docker_run_cmd:process.env.DOCKER_RUN_CMD||"npm run",docker_extra_args:process.env.DOCKER_EXTRA_ARGS||"",docker_base_dir:process.env.DOCKER_BASE_DIR||void 0,docker_jsdc_dir:process.env.DOCKER_JSDC_DIR||"/apps/jsdocker-compose",docker_packagehash_support:"true"===process.env.DOCKER_EXTRA_FILE||!1}},function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=10},function(e,t){e.exports=require("os")}]);