# .gov.jm domains

You can view or download a list of `.gov.jm` domains.

The listing is compiled from the "Government Links" list provided by the
Jamaican government at <http://jis.gov.jm/government/links/>. Domains from that
list not ending in `.gov.jm` are excluded from this listing.

The listing is not available in a proper machine-readable data format, so the
domains are parsed from the HTML documents using the included JavaScript code.

## JavaScript HTML Parser

The JavaScript file is used to generate a machine-readable form of the listing,
specifically a `.csv` file.

The `jis.gov.jm` origin’s web server does not have
[CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) enabled so
the JavaScript has to be executed in the context of that origin. To do so you
will have to execute the script in the JavaScript console in your browser’s
**Developer Tools** while in a tab opened on that origin.

For Google Chrome DevTools:

1.  Open Chrome.
2.  Type <http://jis.gov.jm/government/links/> into the address bar and press
    `Enter`.
3.  Access the Console in Chrome DevTools:

    *   Select the **Chrome menu** at the top-right of your browser window, then
        select **Tools** > **Developer Tools**.

    *   Select **Console** from the tab strip in the window.

    *Tip: Alternatively use the keyboard shortcut `Ctrl` + `Shift` + `J` to
    open the DevTools and bring focus to the Console.*
4.  Open the JavaScript file in your preferred text editor.
5.  Use `Ctrl-A` to select all text and then `Ctrl-C` to copy the script source
    to the clipboard.
6.  Close the text editor.
7.  Return to where you left off in Chrome.
8.  In the Console, use `Ctrl-V` to paste the code you copied to the clipboard
    and then press `Enter` to execute the commands.

After a short while, a `csv` formatted list of domains will be output to the
Console. You can then copy the output and paste it into a newly created file
somewhere on your computer.

## Further Plans

To see if the Government of Jamaica would be willing to provide a canonical
listing and provide it on the [Jamaica Open Data Portal](http://data.gov.jm)
website as a dataset.

To develop a command-line utility to parse the HTML and generate the listing.
Potentially with the ability to produce it in alternative formats, such as
[JSON](http://json.org).
