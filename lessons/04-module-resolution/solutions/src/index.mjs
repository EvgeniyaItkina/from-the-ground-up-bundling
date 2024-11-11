import {the} from './a-module.js'
import {quick} from './a-folder/a-module.js'
import {brown} from './a-folder/b-folder/b-module.mjs'
import {fox} from 'a-package/fox'
import {jumped} from 'a-package/jumped'
import {over} from 'b-package/b-folder/over.js'
import {the as the2} from './a-module.js'
import {lazy} from 'c-package'
import {dog} from 'd-package'


console.log(`${the} ${quick} ${brown} ${fox} ${jumped} ${over} ${the2} ${lazy} ${dog}`)
