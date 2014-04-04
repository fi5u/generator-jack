<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package _s
 */
?>

	</div><!-- #content -->
</div><!-- .main-page -->

<footer class="page-footer" role="contentinfo">
    <div class="page-footer__wrap">
        <?php do_action( 'before_sidebar' ); ?>
        <?php dynamic_sidebar( 'footer' ); ?>
    </div>
</footer>
<?php wp_footer(); ?>

</body>
</html>