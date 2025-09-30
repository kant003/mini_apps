# Preparación inicial

## Configurar git
```bash
git config --global user.name "XXX"
git config --global user.email "XXX"
git config --global core.editor "code --wait"
```

## Clonar el repo
Como somos colaboradores, no hace falta forkear el repositorio

```bash
git clone https://github.com/kant003/mini_apps.git
cd mini_apps
git fetch --all
```

## Politica de ramas
- master: siempre estable, es lo que ve el cliente, aqui guardamos las releases
- develop: todas las features aprobadas del sprint
- feature/UHXX-YYYY: una rama por cada historia de usuario o tarea tecnica

## Descargar todas las ramas
```bash
git switch master    ||   git checkout master
git pull origin master
git switch -c develop
git pull origin develop
```

# Desarrollar una feature (UH)
- Elegir un issue del product backlog y lo movemos a la columna del TO DO
- Nos asignamos como desarrolladores en esa issue
- creamos la rama de trabajo desde develop

```bash
git switch develop
git pull origin develop
git switch -c feature/UH-12-XXXX
```

No ponemos a trabajar lanzando pequeños commits sobre esa feature (rama)
- Un cambio = un commit
- Usa conventionals commits
- No olvides colar el Close #XXX para que la UH se cierre cuando se haga el merge

```bash
git add .
git commit
```


## Sincronizamos la rama develop
para evitar la mayor parte de los conflictos
esto actualiza la rama feature con los cambio en develop
```bash
git fetch origin
git rebase origin/develop       # preferiblemente rebase (esto nos va a generar un historial de commit mas limpio)
# si hay conflictos se tienen que resolver
  git add
  git rabase --continue
```

## publicar tu rama (feature en develo)
```bash
git push -u origin feature/UH-12-XXXX
```

## Abrir una PR (pull request)

- Alguno de tus compañeros la valida (aceptandola o rachazandola)
- Seguir las normas de publicación de las PR

## Aprobación
Cuando un compañero acepte la PR, realizará un merge Squash & Merge de la rama feature a la rama develp
Y cerrá la Issue (normalmente de forma automática)
Hay 3 formas
1) Create a merge commit
2) Squash and merge <-- recomendado
3) Rebase and merge




## Tras el merge
refrescamos develp
```bash
git switch develop
git pull origin develop
```

borramos la rama feature
```bash
git brach -d feature/UH-12-XXXX
git push origin --delete feature/UH-12-XXXX
```

No olvides de pasar la UH que estaba en TO DO a la columna DONE


# Integración con Main
Cuando el sprint termina, tenemos que integrar la rama develop a main
```bash
git switch main
git pull origin master
git tag -a v1.2.0 -m "Relase xxx"
git push origin v1.2.0
```



# Estructura de un commit

<tipo>[scope]: <descripción>

[Descripción mas detallada]

[footer]



Tipos:
- feat
- fix
- docs
- style
- ....









