<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
				<div class="site-info">

					<?php wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'menu_id' => 'primary-menu',
							'menu_cladd' => 'footer-navigation'
						)
					); ?>
					
					<p>Brought to you by © <a href="https://github.com/jorosafi">Rodrigo SF</a> <?php echo date('Y') ?> </p>

				</div><!-- .site-info -->
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
