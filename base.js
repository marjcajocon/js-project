class Widget {
    constructor(tagName) {
        this.tagName = tagName;
    }
}

class Html extends Widget { constructor() { super("html"); } }
class Head extends Widget { constructor() { super("head"); } }
class Body extends Widget { constructor() { super("body"); } }
class Title extends Widget { constructor() { super("title"); } }
class Base extends Widget { constructor() { super("base"); } }
class Link extends Widget { constructor() { super("link"); } }
class Meta extends Widget { constructor() { super("meta"); } }
class Style extends Widget { constructor() { super("style"); } }
class Script extends Widget { constructor() { super("script"); } }
class Noscript extends Widget { constructor() { super("noscript"); } }
class Template extends Widget { constructor() { super("template"); } }

class Section extends Widget { constructor() { super("section"); } }
class Nav extends Widget { constructor() { super("nav"); } }
class Article extends Widget { constructor() { super("article"); } }
class Aside extends Widget { constructor() { super("aside"); } }
class H1 extends Widget { constructor() { super("h1"); } }
class H2 extends Widget { constructor() { super("h2"); } }
class H3 extends Widget { constructor() { super("h3"); } }
class H4 extends Widget { constructor() { super("h4"); } }
class H5 extends Widget { constructor() { super("h5"); } }
class H6 extends Widget { constructor() { super("h6"); } }
class Header extends Widget { constructor() { super("header"); } }
class Footer extends Widget { constructor() { super("footer"); } }

class Address extends Widget { constructor() { super("address"); } }
class P extends Widget { constructor() { super("p"); } }
class Hr extends Widget { constructor() { super("hr"); } }
class Pre extends Widget { constructor() { super("pre"); } }
class Blockquote extends Widget { constructor() { super("blockquote"); } }
class Ol extends Widget { constructor() { super("ol"); } }
class Ul extends Widget { constructor() { super("ul"); } }
class Li extends Widget { constructor() { super("li"); } }
class Dl extends Widget { constructor() { super("dl"); } }
class Dt extends Widget { constructor() { super("dt"); } }
class Dd extends Widget { constructor() { super("dd"); } }
class Figure extends Widget { constructor() { super("figure"); } }
class Figcaption extends Widget { constructor() { super("figcaption"); } }
class Main extends Widget { constructor() { super("main"); } }
class Div extends Widget { constructor() { super("div"); } }

class A extends Widget { constructor() { super("a"); } }
class Em extends Widget { constructor() { super("em"); } }
class Strong extends Widget { constructor() { super("strong"); } }
class Small extends Widget { constructor() { super("small"); } }
class S extends Widget { constructor() { super("s"); } }
class Cite extends Widget { constructor() { super("cite"); } }
class Q extends Widget { constructor() { super("q"); } }
class Dfn extends Widget { constructor() { super("dfn"); } }
class Abbr extends Widget { constructor() { super("abbr"); } }
class Ruby extends Widget { constructor() { super("ruby"); } }
class Rt extends Widget { constructor() { super("rt"); } }
class Rp extends Widget { constructor() { super("rp"); } }
class B extends Widget { constructor() { super("b"); } }
class I extends Widget { constructor() { super("i"); } }
class U extends Widget { constructor() { super("u"); } }
class Mark extends Widget { constructor() { super("mark"); } }
class Bdi extends Widget { constructor() { super("bdi"); } }
class Bdo extends Widget { constructor() { super("bdo"); } }
class Span extends Widget { constructor() { super("span"); } }
class Br extends Widget { constructor() { super("br"); } }
class Wbr extends Widget { constructor() { super("wbr"); } }

class Ins extends Widget { constructor() { super("ins"); } }
class Del extends Widget { constructor() { super("del"); } }

class Img extends Widget { constructor() { super("img"); } }
class Iframe extends Widget { constructor() { super("iframe"); } }
class Embed extends Widget { constructor() { super("embed"); } }
class Object extends Widget { constructor() { super("object"); } }
class Param extends Widget { constructor() { super("param"); } }
class Video extends Widget { constructor() { super("video"); } }
class Audio extends Widget { constructor() { super("audio"); } }
class Source extends Widget { constructor() { super("source"); } }
class Track extends Widget { constructor() { super("track"); } }
class Canvas extends Widget { constructor() { super("canvas"); } }
class Map extends Widget { constructor() { super("map"); } }
class Area extends Widget { constructor() { super("area"); } }
class Svg extends Widget { constructor() { super("svg"); } }
class Math extends Widget { constructor() { super("math"); } }

class Table extends Widget { constructor() { super("table"); } }
class Caption extends Widget { constructor() { super("caption"); } }
class Colgroup extends Widget { constructor() { super("colgroup"); } }
class Col extends Widget { constructor() { super("col"); } }
class Tbody extends Widget { constructor() { super("tbody"); } }
class Thead extends Widget { constructor() { super("thead"); } }
class Tfoot extends Widget { constructor() { super("tfoot"); } }
class Tr extends Widget { constructor() { super("tr"); } }
class Td extends Widget { constructor() { super("td"); } }
class Th extends Widget { constructor() { super("th"); } }

class Form extends Widget { constructor() { super("form"); } }
class Label extends Widget { constructor() { super("label"); } }
class Input extends Widget { constructor() { super("input"); } }
class Button extends Widget { constructor() { super("button"); } }
class Select extends Widget { constructor() { super("select"); } }
class Datalist extends Widget { constructor() { super("datalist"); } }
class Optgroup extends Widget { constructor() { super("optgroup"); } }
class Option extends Widget { constructor() { super("option"); } }
class Textarea extends Widget { constructor() { super("textarea"); } }
class Fieldset extends Widget { constructor() { super("fieldset"); } }
class Legend extends Widget { constructor() { super("legend"); } }
class Progress extends Widget { constructor() { super("progress"); } }
class Meter extends Widget { constructor() { super("meter"); } }
class Output extends Widget { constructor() { super("output"); } }

class Details extends Widget { constructor() { super("details"); } }
class Summary extends Widget { constructor() { super("summary"); } }
class Dialog extends Widget { constructor() { super("dialog"); } }

export {
    Html, Head, Body, Title, Base, Link, Meta, Style, Script, Noscript, Template,
    Section, Nav, Article, Aside, H1, H2, H3, H4, H5, H6, Header, Footer, Address,
    P, Hr, Pre, Blockquote, Ol, Ul, Li, Dl, Dt, Dd, Figure, Figcaption, Main, Div,
    A, Em, Strong, Small, S, Cite, Q, Dfn, Abbr, Ruby, Rt, Rp, B, I, U, Mark, Bdi,
    Bdo, Span, Br, Wbr, Ins, Del, Img, Iframe, Embed, Object, Param, Video, Audio,
    Source, Track, Canvas, Map, Area, Svg, Math, Table, Caption, Colgroup, Col,
    Tbody, Thead, Tfoot, Tr, Td, Th, Form, Label, Input, Button, Select, Datalist,
    Optgroup, Option, Textarea, Fieldset, Legend, Progress, Meter, Output, Details,
    Summary, Dialog
};
