# 0) Preparación (una sola vez)

1. **Clonar el repositorio (colaborador, sin fork)**

```bash
git clone https://github.com/ORG/REPO.git
cd REPO
```

2. **Configurar Git para historial limpio (recomendado)**

```bash
git config pull.rebase true            # 'git pull' hará rebase por defecto
git config rebase.autoStash true       # guarda y restaura cambios locales al rebasar
git config fetch.prune true            # elimina ramas remotas borradas
```

3. **Traer y seguir ramas remotas**

```bash
git fetch --all --prune
git switch -c develop origin/develop   # crea local 'develop' siguiendo a la remota
git switch -c main origin/main         # o 'master' si aplica
```

---

# 1) Flujo diario de trabajo (feature branches)

## A) Crear una rama de feature desde develop

```bash
git switch develop
git pull                               # equivalente a: git pull --rebase origin develop
git switch -c feature/nombre-claro     # p.ej. feature/login-form
```

## B) Trabajar y commitear

Haz cambios pequeños y descriptivos:

```bash
git add .
git commit -m "feat(login): validaciones de email y password"
# Repite el ciclo editar → add → commit
```

## C) Sincronizar tu feature si develop avanzó (muy importante)

Mientras programas, otras personas pueden avanzar `develop`. Mantén tu rama al día:

```bash
# 1. Actualiza develop
git fetch
git switch develop
git pull                                # rebase por defecto (historial lineal)

# 2. Rebasa tu feature sobre el nuevo develop
git switch feature/nombre-claro
git rebase develop

# 3. Si hubo conflictos: resuélvelos, luego:
git add rutas/archivos-resueltos
git rebase --continue

# 4. Sube tu feature (si ya la subiste antes, usa --force-with-lease)
git push -u origin feature/nombre-claro
# o tras rebase:
git push --force-with-lease
```

> **¿Por qué `--force-with-lease`?** Protege contra sobrescribir sin querer cambios ajenos.

---

# 2) Abrir Pull Request (PR) hacia develop

1. Sube tu rama si no lo has hecho:

```bash
git push -u origin feature/nombre-claro
```

2. En GitHub: **New Pull Request** → **base: develop** ← **compare: feature/nombre-claro**.
3. Rellena título y descripción (qué, por qué, cómo probar).
4. Pide revisión. Asegúrate de que pasen los checks (CI, linters, tests).

## Estrategia de merge recomendada para PRs a develop

* **Squash & merge**: deja un solo commit limpio en `develop` con el resumen de la feature.
* Alternativa: **Rebase & merge** (historial lineal conservando commits) si el equipo lo prefiere.

---

# 3) Actualizar tu entorno después de un merge

Cuando acepten tu PR:

```bash
git fetch
git switch develop
git pull
# Opcional: borra tu rama local y remota si ya no se usará
git branch -d feature/nombre-claro
git push origin --delete feature/nombre-claro
```

---

# 4) Integración de develop en main (o master) para releases

Este paso suele hacerlo el **maintainer/release manager**.

1. Asegurar que `develop` está estable (tests verdes, versión actualizada, changelog).

```bash
git fetch
git switch develop
git pull
```

2. Integrar `develop` en `main` (o `master`):

```bash
git switch main
git pull
git merge --no-ff develop   # crea un commit de merge que marca la release
# Si preferís historia lineal: git rebase develop (consenso del equipo)
git push
```

3. **Etiquetar (tag) la versión** y publicar release:

```bash
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

4. **Mantener ramas sincronizadas** (por hotfixes en main)
   Si hubo hotfixes directos en `main`, vuelve a llevarlos a `develop`:

```bash
git switch develop
git merge main
git push
```

---

# 5) Hotfix rápido en producción

1. Crear rama desde `main`:

```bash
git switch main
git pull
git switch -c hotfix/descripcion-breve
```

2. Aplicar cambios, tests y PR **hacia main**.
3. Tras merge en `main`, **tag** y **deploy**.
4. Integrar hotfix en `develop`:

```bash
git switch develop
git pull
git merge main
git push
```

---

# 6) Resolver conflictos (resumen)

1. Durante `git rebase` o `git merge`, Git marca conflictos.
2. Edita archivos, deja la versión correcta.
3. Marca como resueltos:

```bash
git add archivo1 archivo2
# Si estabas en rebase:
git rebase --continue
# Si estabas en merge:
git commit
```

4. Si te atascas:

```bash
git rebase --abort   # o
git merge --abort
```

---

# 7) Buenas prácticas del equipo

* **Convenciones de nombres de ramas:**
  `feature/...`, `fix/...`, `hotfix/...`, `chore/...`, `docs/...`.

* **Mensajes de commit (Conventional Commits):**
  `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `test: ...`, `chore: ...`.

* **Ramas protegidas:** protege `main` y `develop` en GitHub:

  * Requerir PRs + revisiones.
  * Requerir checks de CI.
  * Bloquear pushes directos.

* **PRs pequeños y frecuentes:** más fáciles de revisar.

* **CI local antes del push:** linters/tests pasando.

* **Rebase sobre develop antes de abrir/actualizar PR:** reduce conflictos.

---

# 8) “Cheat sheet” de comandos frecuentes

```bash
# 1. Preparar entorno
git clone https://github.com/ORG/REPO.git
cd REPO
git fetch --all --prune
git switch -c develop origin/develop
git switch -c main origin/main   # o master

# 2. Nueva feature
git switch develop
git pull
git switch -c feature/nombre
# ... cambios ...
git add .
git commit -m "feat(area): descripción"
git push -u origin feature/nombre

# 3. Mantener feature al día
git fetch
git switch develop && git pull
git switch feature/nombre
git rebase develop
git push --force-with-lease

# 4. Tras merge del PR
git switch develop
git pull
git branch -d feature/nombre
git push origin --delete feature/nombre

# 5. Release a main
git switch main
git pull
git merge --no-ff develop
git push
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z

# 6. Hotfix
git switch main && git pull
git switch -c hotfix/bug
# ... cambios ...
git add . && git commit -m "fix: corrige bug X"
git push -u origin hotfix/bug
# PR a main, merge y tag
git switch develop && git pull
git merge main && git push
```

---

## ¿Qué deben recordar tus alumnos?

* **Siempre parten de `develop`** para crear sus `feature/…`.
* **Rebase frecuente** de su feature sobre `develop` para evitar conflictos grandes.
* **PRs con destino `develop`**, revisados y con CI verde.
* **El release manager** integra `develop` en `main` y etiqueta versiones.
* **Hotfixes** nacen en `main` y luego se reinyectan en `develop`.
