---
title: Git
date: 2022-03-14 19:24:01
description: Some commonly used git commands and concepts, for beginners.
tags: 
- git
- linux 
categories: 
- git
---



## What is `git` ?

Git is an open source distributed version control tool (VCS) and source code management system. It was created in 2005 by developers working on the Linux system.


It is useful which allows you to 

- work with other developers simultaneously while disallowing overwritting each other's changes
- maintain a history of every version 

and so on.

## Create a repo

In simple terms, repository, or often 'repo' in short, is a directory that all files in it can be managed by git. The modifications, deletions of every file can be tracked and you can visit or restore the history version at any time. 

`git init` makes the current directory a git repository. 

{% note info %}
After doing this, a hidden directory `.git` is added. Do not modify the files in it, otherwise you might damage the git repository.
{% endnote %}

### Add a file to repository

- Create a file 

  You can use commands like `touch readme.txt` to create a new text file.

  Once you've added a file, git will notice the new file, but it won't track it unless you tell it to. Git only manages changes to files it tracks, so we will send a command to let git track the file. 

- Add it to git

	```shell
	git add readme.txt
	```


- Commit it to git 

	```shell
	git commit -m "wrote a readme file"
	```

	{% note info %}
	
	The message at the end should be something releated to what the commit contains, maybe a new feature, a bug fix, or just fixing a typo.
	
	Never use a commit message like `abcdef` or `123456`, which makes other people who see your commit confused. Commits can live forever in a repo, so a clear commit message can be extremely helpful for you and future programmers who are trying to figure out why some changes was made years later.
	
	{% endnote %}

### The concept of 'staging'

One of the most confusing parts when you're first learning git is the concept of the staging environment and how it relates to a commit. Unlike other version control system (e.g SVN), git has a concept called 'staging area'. 

A **commit** is a record of what changes you have made since the last commit. Essentially, you make changes to a repo (adding or deleting a file, or modifying one), and then tell git to put those changes to a commit.

Commits make up the essence of your project and allow you to jump to the state of a project at any other commit.

To add a file or modification to a commit, you first need to add it to the **staging environment**. You can use `git add <filename>` to do this. 

Once you've add all the files you want to the staging environment, you can then tell `git` to package them into a commit, by using `git commit -m <commit message>`. 

Once you commited, if you did no modifications to the working directory, the working directory is 'clean'. The following output indicates your working tree is clean.

```shell
$ git status
On branch master
nothing to commit, working tree clean
```



## Traveling to the past

### Roll back to a version

- `git log` shows the commit history (from the nearest to the farthest). 

  To prettify the output, use `git log --pretty=oneline` instead, which prints each single commit in one line.

- In git, the pointer named `HEAD` indicates current version, `HEAD^` indicates the last version, and `HEAD~100` indicates the last 100 version.

- Roll back to the last version

  ```shell
  git reset --hard HEAD^
  ```

  This command will discard all the modifications and commits after this version, which is dangerous, and that's why we need to add `--hard` to do it.

  We cannot find the newest version by using `git log` now. We have already travelled to the past, but we cannot see the future currently.

  If we want to go back to the newest version, we have to first find the commit id of it, and use `git reset --hard 1094a`, where `1094a` is your commit number (change it to yours, of course). 

  It's not necessary to write the whole commit id (which is rather long), git will automatically find for the commit whose head matches.

- What can I do if the newest commit id is lost?

  ```shell
  git reflog
  ```

  `git reflog` will record every git command you executed.

### Discard modifications

{% note info %}

Git **tracks the modifications** of files instead of files. 

{% endnote %}

- To discard the modifications in working directory, you can use the following command.
  
  ```shell
  git checkout -- readme.txt
  ```

  If you haven't put the modifications to the staging area (`git add`), this will put the file back to the same state of the version repository. 

  If there're modications since you added the files to the staging, this will put the file back to the state you add them to the staging.

  In one word, this operation lets you go back to the file state at the latest `git commit` or `git add`.

- {% note info %}

  `git checkout` command without `--` is the command to switch branches. 

  {% endnote %}

- `git reset HEAD <file>` can undo the modifications at the staging environment (the modifications that you have 'add'ed but haven't 'commit'ed. It can be used to roll back to a version, or undo the modications at staging to the working directory.

### Deleting a file

In git, deleting a file is also a 'modification'. In general, we can directly delete a file in file manager or using `rm` command. 

After doing this, git will notice that a file has been deleted, and will ask whether you want to delete the file. To 'confirm' deleting the file, use 

```shell
git rm xxx
git commit -m "remove xxx"
```

to delete the file from repo.

{% note info %}
After deleting a file manually, using `git rm xxx` and `git add xxx` (where `xxx` is the deleted file) makes no difference.
{% endnote %}

The other condition is that, you delete a file by mistake. In this case, we can use 

``` 
git checkout -- xxx
```

to restore the file to its latest committed version. In fact, `git checkout --` replaces the file in repo to the file in workspace, so whether you modified or even deleted it, you can use this command to restore it at ease.

However, note that files that have never been added to repos cannot be recovered.




## Branch management 

### The concept of 'branch'

Now let's try something a little more advanced.

Say you want to make a new feature, but don't want to harm the main project unless the new feature is finished. That's what **git branches** can do. Branches allow you to move back and forth between 'states' of a project. Official git docs descibes in this way:

> A branch in Git is simply a lightweight movable pointer to one of these commits. 

For instance, if you want to add a new page to your website, you can create a new branch just for that page without affecting the main part of the project. Once you're done with the page, you can 'merge' changes from your branch into the primary branch. When you create a new branch, Git keeps track of which commit your branch 'branched' off of, so it knows the history behind all the files. 

### Create and merge branches

To be strict, instead of pointing to commit, `HEAD` actually points to `master` (the current branch), and `master` points to the commit. You can also make `HEAD` pointing to other branches.


- Create a branch called 'dev' and switch (check you out) to that branch 

  ```shell
  $ git checkout -b dev
  Switched to a new branch 'dev'
  ```

  `-b` argument means 'create and switch to the branch`, and the command above is equivalent to 

  ```shell
  git branch dev
  git checkout dev
  ```

- See what branch we are currently on 

  ```
  git branch
  ```

  This command will list all existing branches, which the current branch has `*` before the branch name.

- Since we are currently on branch 'dev', all the commits will be committed to that branch. If we switch back to the original branch 'master' by using `git checkout master'`, we will find the new commits disappearing. 

  To merge tha commits on branch 'dev' to the branch 'master', we can use the following command

  ```shell
  $ git merge dev
  Updating d46f35e..b17d20e
  Fast-forward
   readme.txt | 1 +
   1 file changed, 1 insertion(+)
  ```

  **merge** will merge the specified branch to the current branch.

  **Fast-forward** indicates that this merge is in 'fast-forward' mode, that is, directly let 'master' points to the current commit of branch 'dev'. Since this only requires a pointer move, the merge speed is extremely fast.

### Delete a branch


- Delete branch 'dev'

  ```shell
  git branch -d dev
  ```

  Git encourages users to use branches to finish a task, and delete it after finished. Although this is same with directly working on branch 'master', such operation is safer.

### `git switch` command

- New versions of git can let you manage branches by using `git switch` commands

```shell
git switch -c dev        # Create and switch to branch 'dev'
git switch master        # Switch to the existed branch 'master'
```

### Resolve conflicts

In the previous example, we created and switched to a new branch named 'dev', commited something to 'dev', and then merge the two branches. Note that there's no commits on branch 'master', and thanks to this coincidence, the merge process used 'fast-forward' mode.

But what will happen if there're modifications on both branches? 

Remember that git tracks modications instead of files. Instead of using 'fast-forward', git will try to merge both modifications to a file. 

- In this example, both branches ('feature1' and 'master') have commits related to a same file, and a conflict happens when merging.
	```shell
  $ git switch -c feature1   
  Switched to a new branch 'feature1'   # a new branch 'feature1'
  
  $ git switch master
  Switched to branch 'master'
  Your branch is ahead of 'origin/master' by 1 commit.
    (use "git push" to publish your local commits)     # another modifications on master branch
  
  # now git cannot use fast-forward to merge modifications. Conflicts happen !
  $ git merge feature1
  Auto-merging readme.txt
  CONFLICT (content): Merge conflict in readme.txt
  Automatic merge failed; fix conflicts and then commit the result.
  ```
  
- `git status` can tell us the conflicted files.

  ```shell
  $ git status
  On branch master
  Your branch is ahead of 'origin/master' by 2 commits.
    (use "git push" to publish your local commits)
  
  You have unmerged paths.
    (fix conflicts and run "git commit")
    (use "git merge --abort" to abort the merge)
  
  Unmerged paths:
    (use "git add <file>..." to mark resolution)
  
  	both modified:   readme.txt
  
  no changes added to commit (use "git add" and/or "git commit -a")
  ```

  We can see the contents of `readme.txt` (the conflicted file)

  ```
  Git is a distributed version control system.
  Git is free software distributed under the GPL.
  Git has a mutable index called stage.
  Git tracks changes of files.
  <<<<<<< HEAD
  Creating a new branch is quick & simple.
  =======
  Creating a new branch is quick AND simple.
  >>>>>>> feature1
  ```

  Git uses `<<<<<<<`，`=======`，`>>>>>>>` to mark out the modifications of different branches.

- After resolving the conflicts, use `git commit` to commit the changes, and then try merging for another time.

- We can use `git log --graph` to see the merging history of branches.
  ```shell
  $ git log --graph --pretty=oneline --abbrev-commit
  *   cf810e4 (HEAD -> master) conflict fixed
  |\  
  | * 14096d0 (feature1) AND simple
  * | 5dc6824 & simple
  |/  
  * b17d20e branch test
  * d46f35e (origin/master) remove test.txt
  * b84166e add test.txt
  * 519219b git tracks changes
  * e43a48b understand how stage works
  * 1094adb append GPL
  * e475afc add distributed
  * eaadf4e wrote a readme file
  ```

### Force disable fast forward

```
git merge --no-ff -m "merge with no-ff" dev
```

- `--no-ff` tells git not to use fast forward for this time. This kind of merging requires creating a new commit, so we added `-m` arg to write the commit message. 
- 'Fast-forward' merging leaves no trace on this merging, while 'merging with no-ff' can leave a history that a merge happened.



## Remote repo

- Create a repo at github, and link the local repo to the remote repo.

  ```shell
  git remote add origin git@github.com:xxx/xxx.git
  ```

  The default remote repository's name are often `origin`.

- Push the contents of the local repo to the remote repo. 

  ```shell
  git push -u origin master
  ```

  For the first push, we added `-u` arg. Git will not only push the contents of branch 'master' to the remote branch master, but also linking the local 'master' to the remote 'master'.

- Then, every time we made changes to the local repo, we can use the following command

  ```shell
  git push origin master	
  ```

  to push the latest local changes to the remote repo.

- To see the remote repo's information, use

  ```shell
  git remote -v 
  ```

- The above operation is the status that, we have a local repo first, and then the remote repo. If we already have the remote repo, we can use `git clone` command.

  ```
  git clone git@github.com:xxx/xxx.git
  ```


## Cooperate with others

- 'Pushing a branch' means pushing all the local commits to the remote repository. The local branch's name must be specified when pushing, and git will push this branch to the corresponding remote repository.

  ```shell
  git push origin master
  git push origin dev
  ```

- The cooperation usually behaves like the follows:

  1. First, try to use `git push origin <branch_name>` to push one's commits.
  2. If the push fails, it's because that the remote branch are newer than (ahead of) the local one. We need to use `git pull origin <branch_name>` to try to merge the modifications.
  3. If the merge fails, we have to resolve conflicts and commit again.
  4. After solving the conflicts, use `git push origin <branch_name>` and we can successfully push!

- If the `git pull` command outputs `no tracking information`, it indicates the linking relationship between the local branch and the remote branch has not been created. You can use `git branch --set-upstream-to <branch-name> origin <branch-name>` to solve this.



## Tag management

### Create a tag

- Use

  ```shell
  git tag v1.0
  ```

  to create a tag on the current branch.

- We can use `git tag` to see all the tags we currently have.

- We can also tag on previous commits. Find the commit id, and then use `git tag <tag_name> <commit_id>`.

- `-a` specifies the tag name，`-m` specifies the message.

### Managing the tags with remote

- `git push origin <tagname>` pushes a local tag to the remote
- `git push origin --tags` pushes all the local tags that haven't been pushed to the remote. 
- `git tag -d <tagname>` deletes a local tag.
- `git push origin :refs/tags/<tagname>` deletes a remote tag.



