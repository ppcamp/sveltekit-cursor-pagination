# sveltekit-cursor-pagination

A simple example of how to control and handle with a cursor pagination. This repo uses Tailwind, Sveltekit + TS and Skeleton

In this repo, I'll create a simple pagination component table that can be used by multiple skip/take
approaches, different from tanstack, wich doesn't support well custom features.

## How to run?

```bash
npm i
npm run dev
```

## ToDOs

- Add pageSize select
- FIXME: createPagination with SSR
- TODO: use actions/forms to add
- TODO: allow to pass parameters to createPagination
  1.  the pageSize (to allow users to store the pageSize in local|session and retrieve it later)
  2.  all (almost) stores, allowing to re-create an old pagination or using pagination from SSR.

**Proposal:**

<pre>
type PageSizes = Record< string TableKeyName, number>
e.g: { actorsTable: 10, baseTable: 15}

user open →
	on change pageSize →
		[store pageSize into local] →
			close window

user open →
	[load all stores and send them as cookie (cookies can be stringfied) ]→
</pre>

**For #1:**

<pre>
[in page.ts, load cookies for this table] →
	[send loadedPageSize to page and use onMount functions]

</pre>

**For #2:**

<pre>
[create pagination using pageSize got from cookies] →
	[render table with this paginated data] →
		[ create an action for every pagination event and use it to render elements on server ]
</pre>
