import { jsdom } from 'jsdom'

global.window = jsdom().defaultView
global.document = global.window.document
