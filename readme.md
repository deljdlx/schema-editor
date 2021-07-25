# JDLX schema builder

**Work in progress**

Integration of the amazing [jGraph/drawio](https://github.com/jgraph/drawio) library in a custom schema builder tool

http://schema-editor.jlb.ninja/



## Install
```sh
git submodule update --init --recursive
```


## Git submodules initialisation

.gitsubmodules

```ini

[submodule "drawio-to-sql"]
	path = exporter/drawio-to-sql
	url = git@github.com:deljdlx/drawio-to-sql.git
[submodule "drawio-exporter"]
	path = exporter/drawio-exporter
	url = git@github.com:deljdlx/drawio-exporter.git


```


```sh
 # git rm --cached drawio-to-sql
 git submodule add git@github.com:deljdlx/drawio-to-sql.git drawio-to-sql
 ```


